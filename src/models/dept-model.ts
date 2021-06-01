export interface DeptModel {
  deptId: number;
  deptName: string;
  leader: string;
  orderNum: string;
  parentId: number;
  status: string;
  params: Object;
  children: Object;
}
