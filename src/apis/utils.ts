import axios, { AxiosResponse } from 'axios';
import localforage from 'localforage';
import CryptoJs from 'crypto-js';

const AES_KEY = 'abcdefghijkl';
const IV = '123456789';

//axios的全局默认配置
axios.defaults.baseURL = '';

//创建自定义的axios的实例
const request = axios.create({
  timeout: 3000,
  headers: { token: localforage.getItem('token') },
});

const utils = {
  //get和post
  post<T>(url: string, data: T) {
    return request.post(url, data);
  },
  get<T>(url: string, params: T) {
    return request.get(url, { params: params });
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
