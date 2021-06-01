export interface RoleModel {
  admin: boolean;
  dataScope: string;
  deptCheckStrictly: boolean;
  flag: boolean;
  menuCheckStrictly: boolean;
  roleId: number;
  roleKey: string;
  roleName: string;
  roleSort: string;
  status: string;
}
export interface RolesModel {
  [numStr: string]: RoleModel;
}
