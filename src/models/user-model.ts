import { DeptModel } from './dept-model';
import { RolesModel } from './roles-model';

export interface BasicUser {
  account: string;
  phone: string;
  avatar: string;
  major: string;
  username: string;
}

export interface UserModel {
  admin: boolean;
  avatar: string;
  creatBy: string;
  delFlag: string;
  dept: DeptModel;
  deptId: number;
  email: string;
  loginDate: string;
  loginIp: string;
  nickName: string;
  params: Object;
  phonenumber: string;
  remark: string;
  roles: RolesModel;
  sex: string;
  status: string;
  userId: number;
  userName: string;
}
