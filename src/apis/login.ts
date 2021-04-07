import { utils } from './utils';
import { BasicUser } from '../models/user-model';
import localforage from 'localforage';
import { userStore } from '../stores/user-store';

export const login = <T>(url: string, data: T) => {
  //TODO:　AES加密

  utils.post(url, data).then((res) => {
    console.log(res);

    if (res.status === 200) {
      //写入token
      localforage
        .setItem('token', res.data['token'])
        .then(() => {
          //TODO: userStore刷新登录状态
          //TODO: 保存用户信息
          userStore.setBasic(res.data['basic-user']);

          //TODO: 路由跳转
          console.log('跳转');
        })
        .catch((err) => console.log(err));
    }
  });
};
