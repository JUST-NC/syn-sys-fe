import { CanOrNot } from '../enum/CanOrNot';

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
}

export interface BasicHoliday {
  //表单id
  id: number;
  //请假人id
  userId: number;
  //请假开始日期
  beginDate: string;
  //请假结束日期
  endDate: string;
  //请假理由
  reason: string;
  //表单状 态：审批中，已审批等
  status: string;
  //是否需要进出校门， can or cannot
  needInOut: CanOrNot;
  //是否生病
  isSick: CanOrNot;
  //是否能上课
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
  //当前表单所处流程或状态
  activities: BasicActivity;
  //表单数据
  holiday: BasicHoliday;
  //TODO: 用户
}

export interface HolidayForm {
  //请假单合集
  flows: flow[];
  //请假单数量
  totalCount: number;
  //请假单页数
  totalPages: number;
}
