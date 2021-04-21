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
import { str2Bool } from '../utils/bool-string';
import * as Yup from 'yup';
import { valRequired } from '../utils/validate-format';
import { makeValidate } from 'mui-rff';

/**
 * 对 LeaveModel 进行微调，符合表单输入需求
 */
interface LeaveFormModel
  extends Omit<
    LeaveModel,
    'num' | 'needInOut' | 'isSick' | 'canGoClass' | 'beginDate' | 'endDate'
  > {
  needInOut: string;
  isSick: string;
  canGoClass: string;
  beginDate: Date;
  endDate: Date;
}

export interface LeaveStore {
  beginDate: string | null;
  endDate: string | null;
  setBeginDate: ActionType<string>;
  setEndDate: ActionType<string>;
  today: Date;
  beginMaxDate: Date;
  endMinDate: Date;
  endMaxDate: Date;
  beforeToday: Date;
  afterBeginMaxDate: Date;
  beforeEndMinDate: Date;
  afterEndMaxDate: Date;
  num: number;
}

/**
 * 目前主要做日期处理
 */
const leaveStore = observable<LeaveStore>(
  {
    beginDate: null,
    endDate: null,
    setBeginDate(fn: (prev: string) => string) {
      this.beginDate = fn(this.beginDate || '');
    },
    setEndDate(fn: (prev: string) => string) {
      this.endDate = fn(this.endDate || '');
    },
    get today() {
      return new Date();
    },
    get beginMaxDate() {
      // 默认最多可选三十天内的
      return add(this.today, {
        days: 30,
      });
    },
    get endMinDate() {
      // 这边的 parseISO 依赖于 constant.DATE_FORMAT 的 yyyy-MM-dd
      return this.beginDate ? parseISO(this.beginDate) : this.today;
    },
    get endMaxDate() {
      return add(this.endMinDate, {
        days: 30,
      });
    },
    get beforeToday() {
      return add(this.today, { days: -1 });
    },
    get beforeEndMinDate() {
      return add(this.endMinDate, { days: -1 });
    },
    get afterBeginMaxDate() {
      return add(this.beginMaxDate, { days: 1 });
    },
    get afterEndMaxDate() {
      return add(this.endMaxDate, { days: 1 });
    },
    get num() {
      return differenceInDays(parseISO(this.endDate), this.endMinDate) + 1;
    },
  },
  {
    beginDate: observable,
    endDate: observable,
    setBeginDate: action,
    setEndDate: action,
    today: computed,
    beginMaxDate: computed,
    endMinDate: computed,
    endMaxDate: computed,
    num: computed,
  },
);

/**
 * TODO: 提交接口
 * TODO: 提交后的模态框
 * @param values
 */
const onSubmit = (values: LeaveFormModel) => {
  const data: LeaveModel = {
    ...(str2Bool(values) as LeaveModel),
    beginDate: leaveStore.beginDate as string,
    endDate: leaveStore.endDate as string,
    num: leaveStore.num,
  };

  console.log(data);
};

/**
 * 是否选项，用于 ToggleGroup
 */
const YES_NO = [
  { value: 'true', label: '是' },
  { value: 'false', label: '否' },
];

/**
 * 初始值
 * TODO: 从本地获取学号
 */
const INITIAL_DATA: LeaveFormModel = {
  account: '',
  phone: '',
  reason: '',
  needInOut: 'true',
  isSick: 'false',
  canGoClass: 'false',
  beginDate: leaveStore.today,
  endDate: leaveStore.today,
};

/**
 * 验证器
 * TODO: 添加更严格的验证范围
 */

const LeaveApplication = observer(() => {
  const schema: Yup.AnySchema = Yup.object().shape({
    account: Yup.string().required(valRequired('账号')),
    phone: Yup.string().required(valRequired('手机号')),
    reason: Yup.string().required(valRequired('请假原因')),
    beginDate: Yup.date()
      .required(valRequired('开始日期'))
      .min(leaveStore.beforeToday, '开始日期不能早于今天')
      .max(leaveStore.afterBeginMaxDate, '开始日期不能超过今天 30 天'),
    endDate: Yup.date()
      .required(valRequired('结束日期'))
      .min(leaveStore.beforeEndMinDate, '结束日期不能早于开始日期')
      .max(leaveStore.afterEndMaxDate, '结束日期不能超过开始日期 30 天'),
  });

  const validate = makeValidate(schema);

  return (
    <>
      <Helmet>
        <title>请假申请</title>
      </Helmet>

      <RouterLink to={HOME_PAGE.path}>
        <IconButton tw={'fixed -top-4 -right-3 p-4 z-50 bg-gray-300 shadow-md'}>
          <VscClose size={theme('fontSize.5xl')} color={theme('colors.white')} />
        </IconButton>
      </RouterLink>

      <Paper elevation={0} tw={'pb-20 px-10'}>
        <Box tw={'my-10 flex flex-row justify-between items-center'}>
          <Typography variant={'h4'} tw={'i-color -ml-px'}>
            请假申请
          </Typography>
        </Box>
        <Form onSubmit={onSubmit} initialValues={INITIAL_DATA} validate={validate}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              {/*TODO: 这边的 INITIAL_DATA.account !== '' 以后是要去掉的*/}
              <FormInput
                label={'账号'}
                name={LeaveEnum.ACCOUNT}
                autoComplete={'username'}
                disabled={INITIAL_DATA.account !== ''}
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
                <FormButton
                  tw={'shadow-lg hocus:active:(shadow-none) transition-shadow'}
                  type={'submit'}
                  size={'medium'}
                >
                  提交
                </FormButton>
              </Paper>

              <OnChange name={LeaveEnum.BEGIN_DATE}>
                {(value: Date) => {
                  leaveStore.setBeginDate(() => format(value, constant.DATE_FORMAT));
                }}
              </OnChange>

              <OnChange name={LeaveEnum.END_DATE}>
                {(value: Date) => {
                  leaveStore.setEndDate(() => format(value, constant.DATE_FORMAT));
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
