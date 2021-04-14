import { utils } from './utils';
import { BasicUser } from '../models/user-model';
import { userStore } from '../stores/user-store';
import localforage from 'localforage';

const LOGIN = '/dev-api/login';

//登录api
export const login = <T>(data: T) => {
  utils.post(LOGIN, data).then((res) => {
    if (res.data['code'] === 200) {
      let respData = res.data;
      let basic: BasicUser = respData['data'];
      console.log(basic);
      userStore.setBasic(basic);

      localforage.setItem('token', respData['token']).then(() => {
        //TODO: 登录后返回的数据处理
        console.log(res.data);
        // window.location.href = '/';
      });
    }
  });
};
