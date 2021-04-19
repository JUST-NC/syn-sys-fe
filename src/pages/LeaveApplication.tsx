import React from 'react';
import Paper from '@material-ui/core/Paper';
import Div100vh from 'react-div-100vh';
import { Helmet } from 'react-helmet-async';
import { Form } from 'react-final-form';
import { observer } from 'mobx-react-lite';
import { LeaveEnum, LeaveModel } from '../models/leave-model';
import { TextField } from 'mui-rff';
import { action, computed, observable } from 'mobx';
import { ActionType } from '../utils/action-type';
import 'twin.macro';
import Button from '@material-ui/core/Button';
import { FormDateRangePicker } from '../components/FormDateRangePicker';
import { OnChange } from 'react-final-form-listeners';
import { add, differenceInDays, format, parseISO } from 'date-fns';
import { constant } from '../utils/constant';
import { FormToggleGroup } from '../components/FormToggleGroup';
import { css } from '@emotion/react';

interface LeaveFormModel extends Omit<LeaveModel, 'num'> {}

export interface LeaveStore<T extends LeaveFormModel> {
  data: T;
  setData: ActionType<T>;
  setBeginDate: ActionType<string>;
  minDate: Date;
  maxDate: Date;
  num: number;
}

const YES_NO = [
  { value: 'true', label: '是' },
  { value: 'false', label: '否' },
];

const leaveStore = observable<LeaveStore<LeaveFormModel>>(
  {
    data: {
      account: '',
      phone: '',
      reason: '',
      needInOut: true,
      isSick: false,
      canGoClass: false,
      beginDate: '',
      endDate: '',
    },
    setData(fn: (prev: LeaveFormModel) => LeaveFormModel) {
      this.data = fn(this.data);
    },
    setBeginDate(fn: (prev: string) => string) {
      this.data.beginDate = fn(this.data.beginDate);
    },
    get minDate() {
      // 这边的 parseISO 依赖于 constant.DATE_FORMAT 的 yyyy-MM-dd
      return parseISO(this.data.beginDate ?? new Date());
    },
    get maxDate() {
      return add(this.minDate, {
        days: 30,
      });
    },
    get num() {
      return differenceInDays(this.minDate, parseISO(this.data.endDate));
    },
  },
  {
    data: observable.deep,
    setData: action,
    maxDate: computed,
    num: computed,
  },
);

const LeaveApplication = observer(() => {
  const onSubmit = (values: LeaveModel) => {
    console.log(values);
  };

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
                css={css`
                  .MuiInputLabel-shrink {
                    transform: translate(0, 1.5px) scale(1);
                  }
                `}
                label={'电话号码'}
                name={LeaveEnum.PHONE}
                autoComplete={'tel-national'}
                required={true}
                InputLabelProps={{ disableAnimation: true, shrink: true }}
              />

              <FormToggleGroup
                name={LeaveEnum.NEED_IN_OUT}
                label={'是否进出校门'}
                toggles={YES_NO}
                required={true}
              />

              <FormToggleGroup
                name={LeaveEnum.IS_SICK}
                label={'是否生病'}
                toggles={YES_NO}
                required={true}
              />

              <FormToggleGroup
                name={LeaveEnum.CAN_GO_CLASS}
                label={'是否可以上课'}
                toggles={YES_NO}
                required={true}
              />

              <FormDateRangePicker
                label={'请假时间'}
                beginDateProps={{ placeholder: '开始日期', name: LeaveEnum.BEGIN_DATE }}
                endDateProps={{
                  placeholder: '结束日期',
                  name: LeaveEnum.END_DATE,
                  minDate: leaveStore.minDate,
                  maxDate: leaveStore.maxDate,
                }}
                animateYearScrolling={true}
                showTodayButton={true}
                disablePast={true}
                required={true}
              />
              <TextField
                label={'请假原因'}
                name={LeaveEnum.REASON}
                multiline={true}
                rows={4}
                required={true}
              />

              <Button type={'submit'} variant={'contained'}>
                提交
              </Button>

              <OnChange name={LeaveEnum.BEGIN_DATE}>
                {(value: Date) => {
                  leaveStore.setBeginDate(() => format(value, constant.DATE_FORMAT));
                }}
              </OnChange>
            </form>
          )}
        </Form>
      </Paper>
    </>
  );
});

export { LeaveApplication };
