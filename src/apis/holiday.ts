import { utils } from './utils';
import { FlowStatus } from '../enum/FlowStatus';
import { HolidayForm } from '../models/holidayForm-model';
import { formStore } from '../stores/form-store';

//请假表单接口的默认url
const CREATE = 'dev-api/holidays';

export interface ParamsToGetForm {
  //页码（从1开始）
  page: number;
  //页大小
  page_size: number;
  //查询的表单类型
  flow_status: FlowStatus;
}

//有关请假的请求
const holiday = {
  // //请假
  // apply<T>(form: T) {
  //   utils.post(CREATE, form).then((res) => {
  //     if (res.data['status'] === 200) {
  //       //TODO: 表单处理
  //       let respData = res.data;
  //       console.log(respData);
  //     }
  //   });
  // },
  // //获取请假单
  // get(params: ParamsToGetForm) {
  //   utils.get(CREATE, params).then((res) => {
  //     //数据处理
  //     let resData: HolidayForm = res.data.data;
  //     formStore.concat(resData.flows);
  //     formStore.totalCount = resData.totalCount;
  //     // console.log(resData.flows[0].activities);
  //   });
  // },
};

export { holiday };
