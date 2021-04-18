import { BasicUser } from './user-model';

/**
 * 请假申请数据
 */
export interface LeaveModel extends Pick<BasicUser, 'account' | 'phone'> {
  // 请假原因
  reason: string;
  // 开始时间
  beginDate: string;
  // 结束时间
  endDate: string;
  // 是否需要进出校门
  needInOut: boolean;
  // 是否生病
  isSick: boolean;
  // 是否可以正常上课
  canGoClass: boolean;
  // 1~30 天，14天及以上只记录，需要到线下请假
  num: number;
}

/**
 * 方便写字段
 */
export enum LeaveEnum {
  ACCOUNT = 'account',
  PHONE = 'phone',
  REASON = 'reason',
  BEGIN_DATE = 'beginDate',
  END_DATE = 'endDate',
  NEED_IN_OUT = 'needInOut',
  IS_SICK = 'isSick',
  CAN_GO_CLASS = 'canGoClass',
  NUM = 'num',
}
