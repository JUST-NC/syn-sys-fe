import { utils } from './utils';
import { FlowStatus } from '../enum/FlowStatus';
import { HolidayForm } from '../models/holidayForm-model';

//请假表单接口的默认url
const CREATE = '/holidays/';

interface ParamsToGetForm {
  //页码（从1开始）
  page: number;
  //页大小
  page_size: number;
  //查询的表单类型
  flow_status: FlowStatus;
}

const holiday = {
  //请假
  apply<T>(form: T) {
    utils.post(CREATE, form).then((res) => {
      if (res.data['status'] === 200) {
        //TODO: 表单处理
        let respData = res.data;
        console.log(respData);
      }
    });
  },
  //获取表单
  get(params: ParamsToGetForm) {
    utils.get(CREATE, params).then((res) => {
      let resData: HolidayForm = res.data;
      console.log(resData.flows[0].activities);
    });
  },
};

export { holiday };
