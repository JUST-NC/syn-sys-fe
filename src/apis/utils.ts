import axios, { AxiosResponse } from 'axios';
import localforage from 'localforage';
import CryptoJs from 'crypto-js';
import { ResponseModel } from '../models/response-model';
import { ValueOf } from '../utils/valueof';
import _ from 'lodash';
import { userStore } from '../stores/user-store';

const AES_KEY = 'abcdefghijkl';
const IV = '123456789';

//axios的全局默认配置
axios.defaults.baseURL = '';

//创建自定义的axios的实例
const request = axios.create({
  timeout: 3000,
});

type ResponseOnlyData<R extends ResponseModel> = Omit<R, 'code' | 'msg'>;

const utils = {
  //get和post
  post<T, R extends ResponseModel>(url: string, data: T): Promise<ResponseOnlyData<R>> {
    return request
      .post<T, AxiosResponse<R>>(url, data, {
        headers: userStore.token ? { Authorization: userStore.authorization } : undefined,
      })
      .then((res) => (res.status === 200 ? res.data : Promise.reject('接口访问超时')))
      .then((resData) =>
        resData.code === 200
          ? (_.omit<R>(resData, ['code', 'msg']) as ResponseOnlyData<R>)
          : Promise.reject(resData.msg),
      )
      .catch((err: string) => {
        console.error(err);
        return Promise.reject(err);
      });
  },
  get<R extends ResponseModel, P = void>(
    url: string,
    params?: P,
  ): Promise<ResponseOnlyData<R>> {
    return request
      .get<R>(url, {
        params: params,
        headers: userStore.token ? { Authorization: userStore.authorization } : undefined,
      })
      .then((res) => (res.status === 200 ? res.data : Promise.reject('接口访问超时')))
      .then((resData) =>
        resData.code === 200
          ? (_.omit<R>(resData, ['code', 'msg']) as ResponseOnlyData<R>)
          : Promise.reject(resData.msg),
      )
      .catch((err: string) => {
        console.error(err);
        return Promise.reject(err);
      });
  },
};

//TODO: 格式化
//request请求拦截器
request.interceptors.request.use(
  (config) => {
    //TODO: 生产环境下加密传输
    if (process.env.NODE_ENV === 'production') {
      //编码后的明文和key
      let reqData = config.data;
      let text = CryptoJs.enc.Utf8.parse(reqData);
      let key = CryptoJs.enc.Utf8.parse(AES_KEY);
      let options = {
        mode: CryptoJS.mode.CBC,
        iv: CryptoJS.enc.Utf8.parse(IV),
        padding: CryptoJS.pad.Pkcs7,
      };
      //AES加密
      config.data = CryptoJs.AES.encrypt(text, key, options).toString();
      console.log('加密后的数据', config.data);
    }

    return config;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  },
);

//request响应拦截器
request.interceptors.response.use(
  (res) => {
    let respData = res.data;
    //生产环境下加密
    if (process.env.NODE_ENV === 'production') {
      //解码
      let key = AES_KEY || CryptoJs.enc.Utf8.parse(AES_KEY);
      let text = respData || CryptoJs.enc.Utf8.parse(res.data);
      let options = {
        mode: CryptoJS.mode.CBC,
        iv: CryptoJS.enc.Utf8.parse(IV),
        padding: CryptoJS.pad.Pkcs7,
      };

      res.data = CryptoJs.AES.decrypt(
        respData,
        CryptoJs.enc.Utf8.parse(AES_KEY),
        options,
      ).toString(CryptoJS.enc.Utf8);
    }
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { utils };
