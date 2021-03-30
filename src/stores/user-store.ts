import { autorun, observable } from 'mobx';
import { BasicUser } from '../models/user-model';

export interface UserStore {
  // 用户基本信息
  basic?: BasicUser;
  // 设置 basic 的 action
  setBasic: (basic: BasicUser) => void;
  // 是否已登录
  logged: boolean;
}

const userStore = observable<UserStore>({
  setBasic(basic: BasicUser) {
    this.basic = basic;
  },
  get logged() {
    return !!this.basic;
  },
});

// 本处仅为测试，将在不久后移除
// TODO: 使用客户端数据初始化
autorun(() => {
  console.log(typeof userStore.basic === 'undefined' ? '数据不存在' : '数据存在');
});

export { userStore };
