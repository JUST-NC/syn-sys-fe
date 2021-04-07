import axios, { AxiosResponse } from 'axios';
import localforage from 'localforage';

//axios的全局默认配置
axios.defaults.baseURL = '';

const utils = {
  post<T>(url: string, data: T) {
    return axios.post(url, {
      data: data,
      token: localforage.getItem('token'),
    });
  },
};

export { utils };
