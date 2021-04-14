//流程
export interface BasicActivity {
  //请假人学号
  createHolidayForm: number;
  //班导师审批，即审批人工号
  classTutor: string | null;
  //学生管理科审批，即审批人工号
  studentManageApprove: string | null;
  //驳回理由
  rejectReason: string;
  //空串
  agree: string;
  initial(createHolidayForm: number): void;
}

export interface BasicHoliday {
  //表单id
  id: number;
  //请假人id
  userid: number;
  //请假开始日期
  beginDate: string;
  //请假结束日期
  endDate: string;
  //请假理由
  reason: string;
  //表单状态：审批中，已审批等
  status: string;
  //是否需要进出校门， 0否， 1是
  needInOut: 0 | 1;
  //是否生病
  isSick: 0 | 1;
  //是否能上课
  canGoClass: 0 | 1;
  //电话号码
  phone: string;
  //审批人建议
  comment: string;
  //更新时间
  updateTime: string;
  //创建时间
  createTime: string;
}

//请假表流程数据
export interface flow {
  activities: BasicActivity[];
  holiday: BasicHoliday;
}

export interface HolidayForm {
  flows: flow[];
}
