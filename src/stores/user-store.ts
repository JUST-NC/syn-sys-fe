import { autorun, observable } from 'mobx';
import { BasicUser } from '../models/user-model';
import * as localforage from 'localforage';
export interface UserStore {
  // 用户基本信息
  basic?: BasicUser;
  token?: string;
  // 设置 basic 的 action
  setBasic: (basic: BasicUser) => void;
  setToken: (token: string) => void;
  // 是否已登录
  logged: boolean;
  authorization: string;
}

const userStore = observable<UserStore>({
  setBasic(basic) {
    this.basic = basic;
  },
  setToken(token) {
    this.token = token;
  },
  get logged() {
    return !!this.basic && !!this.token;
  },
  get authorization() {
    return 'Bearer ' + this.token;
  },
});

// 本处仅为测试，将在不久后移除
// TODO: 使用客户端数据初始化
autorun(() => {
  if (!userStore.logged) {
    localforage
      .getItem<BasicUser>('user-info')
      .then((r) => (r ? userStore.setBasic(r) : Promise.reject('尚未登陆')))
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        console.log('info:' + userStore.basic);
      });

    localforage
      .getItem<string>('token')
      .then((r) => (r ? userStore.setToken(r) : Promise.reject('尚未登录')))
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        console.log('token:' + userStore.token);
      });
  }
});

autorun(() => {
  if (userStore.logged) {
    localforage.setItem('user-info', userStore.basic).then((r) => {
      console.log(r);
    });
    localforage.setItem('token', userStore.token).then((r) => {
      console.log(r);
    });
  }
});

export { userStore };
