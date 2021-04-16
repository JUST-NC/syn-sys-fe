import { BasicUser } from './user-model';

/**
 * 请假申请模型
 */
export interface LeaveModel extends Pick<BasicUser, 'account' | 'phone'> {
  // 请假原因
  reason: string;
  // 开始时间
  beginDate: string;
  // 结束时间
  endDate: string;
  // 是否需要chu
  needInOut: boolean;
  // 是否生病
  isSick: boolean;
  // 是否可以正常上课
  canGoClass: boolean;
  // 1~30 天，14天及以上只记录，需要到线下请假
  num: number;
}
