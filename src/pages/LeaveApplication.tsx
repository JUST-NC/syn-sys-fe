import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Helmet } from 'react-helmet-async';
import { Form } from 'react-final-form';
import { observer } from 'mobx-react-lite';
import { LeaveEnum, LeaveModel } from '../models/leave-model';
import { action, computed, observable } from 'mobx';
import { ActionType } from '../utils/action-type';
import { FormDateRangePicker } from '../components/FormDateRangePicker';
import { OnChange } from 'react-final-form-listeners';
import { add, differenceInDays, format, parseISO } from 'date-fns';
import { constant } from '../utils/constant';
import { FormToggleGroup } from '../components/FormToggleGroup';
import { FormInput } from '../components/FormInput';
import { FormButton } from '../components/FormButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { VscClose } from 'react-icons/vsc';
import { theme } from 'twin.macro';
import { Link as RouterLink } from 'react-router-dom';
import { HOME_PAGE } from '../routes';

interface LeaveFormModel extends Omit<LeaveModel, 'num'> {}

export interface LeaveStore<T extends LeaveFormModel> {
  data: T;
  setData: ActionType<T>;
  setBeginDate: ActionType<string>;
  today: Date;
  beginMaxDate: Date;
  endMinDate: Date;
  endMaxDate: Date;
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
    get today() {
      return new Date();
    },
    get beginMaxDate() {
      return add(this.today, {
        days: 30,
      });
    },
    get endMinDate() {
      // 这边的 parseISO 依赖于 constant.DATE_FORMAT 的 yyyy-MM-dd
      return this.data.beginDate ? parseISO(this.data.beginDate) : this.today;
    },
    get endMaxDate() {
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
    today: computed,
    beginMaxDate: computed,
    endMinDate: computed,
    endMaxDate: computed,
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

      <RouterLink to={HOME_PAGE.path}>
        <IconButton tw={'fixed -top-4 -right-3 p-4 z-50 bg-gray-300'}>
          <VscClose size={theme('fontSize.5xl')} color={theme('colors.white')} />
        </IconButton>
      </RouterLink>

      <Paper elevation={0} tw={'pb-20 px-10'}>
        <Box tw={'my-10 flex flex-row justify-between items-center'}>
          <Typography variant={'h4'} tw={'i-color -ml-px'}>
            请假申请
          </Typography>
        </Box>
        <Form onSubmit={onSubmit} initialValues={leaveStore.data}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <FormInput
                label={'账号'}
                name={LeaveEnum.ACCOUNT}
                autoComplete={'username'}
                disabled={true}
                required={true}
              />

              <FormInput
                label={'电话号码'}
                name={LeaveEnum.PHONE}
                autoComplete={'tel-national'}
                required={true}
              />

              <FormToggleGroup
                name={LeaveEnum.NEED_IN_OUT}
                label={'是否需要进出校门'}
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
                beginDateProps={{
                  placeholder: '开始日期',
                  name: LeaveEnum.BEGIN_DATE,
                  maxDate: leaveStore.beginMaxDate,
                }}
                endDateProps={{
                  placeholder: '结束日期',
                  name: LeaveEnum.END_DATE,
                  minDate: leaveStore.endMinDate,
                  maxDate: leaveStore.endMaxDate,
                }}
                animateYearScrolling={true}
                showTodayButton={true}
                disablePast={true}
                required={true}
              />

              <FormInput
                label={'请假原因'}
                name={LeaveEnum.REASON}
                multiline={true}
                rows={5}
                required={true}
              />

              <Paper
                elevation={0}
                tw={
                  'fixed bottom-0 left-0 flex justify-center items-center w-screen  py-6 bg-transparent bg-gradient-to-b from-transparent to-white z-50'
                }
              >
                <FormButton type={'submit'} size={'medium'}>
                  提交
                </FormButton>
              </Paper>

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
