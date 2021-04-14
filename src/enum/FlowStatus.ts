//表示表单状态或类型
export enum FlowStatus {
  //审核中
  examining = 0,
  //已通过
  applied = 1,
  //驳回
  rejected = -1,
  //已经审核过
  examined = 2,
}
