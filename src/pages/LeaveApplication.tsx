import React from 'react';
import { Paper } from '@material-ui/core';
import Div100vh from 'react-div-100vh';
import { Helmet } from 'react-helmet-async';
import { Form } from 'react-final-form';
import { observer } from 'mobx-react-lite';
import { LeaveEnum, LeaveModel } from '../models/leave-model';
import { TextField } from 'mui-rff/dist/TextField';
import { Radios } from 'mui-rff/dist/Radios';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker } from 'mui-rff/dist/KeyboardDatePicker';
import { action, computed, observable } from 'mobx';
import { ActionType } from '../utils/action-type';

export interface LeaveStore {
  data: LeaveModel;
  setData: ActionType<LeaveModel>;
  minDate: Date;
  maxDate: Date;
  num: number;
}

const YES_NO = [
  { label: '是', value: 1 },
  { label: '否', value: 0 },
];

const leaveStore = observable<LeaveStore>(
  {
    data: {
      account: '',
      phone: '',
      reason: '',
      needInOut: 1,
      isSick: 1,
      canGoClass: 1,
      beginDate: '',
      endDate: '',
    },
    setData(fn: (prev: LeaveModel) => LeaveModel) {
      this.data = fn(this.data);
    },
    get maxDate() {
      return this.minDate.setDate(this.minDate + 30);
    },
    get minDate() {
      return new Date();
    },
    get num() {
      return (
        new Date(this.data.endDate).getDate() - new Date(this.data.beginDate).getDate()
      );
    },
  },
  {
    data: observable.deep,
    setData: action,
    minDate: computed,
    maxDate: computed,
    num: computed,
  },
);

const LeaveApplication = observer(() => {
  const onSubmit = () => {};

  return (
    <>
      <Helmet>
        <title>请假申请</title>
      </Helmet>

      <Paper elevation={0} component={Div100vh} tw={'py-20 px-10'}>
        <Form onSubmit={onSubmit} initialValues={leaveStore.data}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                label={'账号'}
                name={LeaveEnum.ACCOUNT}
                autoComplete={'username'}
                disabled={true}
                required={true}
              />
              <TextField
                label={'电话号码'}
                name={LeaveEnum.PHONE}
                autoComplete={'tel-national'}
                required={true}
              />
              <TextField
                label={'请假原因'}
                name={LeaveEnum.REASON}
                multiline={true}
                rows={4}
                required={true}
              />
              <Radios
                label={'是否进出校门'}
                name={LeaveEnum.NEED_IN_OUT}
                data={YES_NO}
                required={true}
              />
              <Radios
                label={'是否生病'}
                name={LeaveEnum.IS_SICK}
                data={YES_NO}
                required={true}
              />
              <Radios
                label={'是否可以正常上课'}
                name={LeaveEnum.CAN_GO_CLASS}
                data={YES_NO}
                required={true}
              />
              <KeyboardDatePicker
                label={'开始日期'}
                name={LeaveEnum.BEGIN_DATE}
                dateFunsUtils={DateFnsUtils}
                autoOk={true}
                required={true}
              />
              <KeyboardDatePicker
                label={'终止日期'}
                name={LeaveEnum.END_DATE}
                dateFunsUtils={DateFnsUtils}
                autoOk={true}
                required={true}
              />
              <TextField label={'请假天数'} name={LeaveEnum.NUM} />
            </form>
          )}
        </Form>
      </Paper>
    </>
  );
});

export { LeaveApplication };
