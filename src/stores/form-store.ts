import { Flow, HolidayForm } from '../models/holidayForm-model';
import { observable } from 'mobx';

interface FormStore {
  //所有向后端请求过的请假单流程数据
  flowList: Flow[];
  //请假单数量
  totalCount: number;
  append: (flow: Flow) => void;
  concat: (flows: Flow[]) => void;
  length: number;
}

const formStore = observable<FormStore>({
  flowList: [],
  totalCount: 0,
  append(flow: Flow): void {
    this.flowList.push(flow);
  },
  concat(flows: Flow[]): void {
    for (const flow of flows) {
      if (!this.flowList.includes(flow)) {
        this.append(flow);
      }
    }
  },
  get length() {
    return this.flowList.length;
  },
});

export { formStore };
