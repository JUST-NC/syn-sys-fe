import React from 'react';
import { DatePicker, DatePickerProps } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';
import { zhCN } from 'date-fns/locale';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import { FormLabel, Typography } from '@material-ui/core';
import 'twin.macro';
import { constant } from '../utils/constant';
import { observer } from 'mobx-react-lite';

/**
 * 从属性中排除一些公共值
 */
type DateProps = Omit<
  DatePickerProps,
  | 'label'
  | 'format'
  | 'required'
  | 'disablePast'
  | 'disableFuture'
  | 'showTodayButton'
  | 'todayLabel'
  | 'cancelLabel'
  | 'okLabel'
  | 'animateYearScrolling'
>;

export interface FormDateRangePickerProps {
  label: string;
  beginDateProps: DateProps;
  endDateProps: DateProps;
  format?: string;
  required?: boolean;
  disablePast?: boolean;
  disableFuture?: boolean;
  showTodayButton?: boolean;
  todayLabel?: string;
  betweenLabel?: string;
  cancelLabel?: string;
  okLabel?: string;
  animateYearScrolling?: boolean;
}

/**
 * 添加了一些简单样式的日期选择器
 */
const StyledDatePicker = observer<DatePickerProps>(({ ...props }) => (
  <DatePicker
    tw={'w-auto'}
    InputLabelProps={{
      shrink: true,
    }}
    {...props}
  />
));

/**
 * 日期区间选择器
 *
 * 进行了中文本地化，为了方便所以有一部分是写死在里面的……
 *
 * 如果想修改组件的话，建议看一下 {@link https://material-ui-pickers.dev/}
 */
const FormDateRangePicker = observer<FormDateRangePickerProps>((props) => {
  let {
    label,
    betweenLabel = '至',
    beginDateProps,
    endDateProps,
    ...commonProps
  } = props;

  // 提供一些默认值
  commonProps = {
    format: commonProps.format ?? constant.DATE_FORMAT,
    todayLabel: commonProps.todayLabel ?? '回到今天',
    cancelLabel: commonProps.cancelLabel ?? '取消',
    okLabel: commonProps.okLabel ?? '确认',
    ...commonProps,
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhCN}>
      <Box>
        <FormLabel>{label}</FormLabel>
        <Box tw={'flex items-center'}>
          <StyledDatePicker {...commonProps} {...beginDateProps} />
          <Typography tw={'inline-block mx-4'}>{betweenLabel}</Typography>
          <StyledDatePicker {...commonProps} {...endDateProps} />
        </Box>
      </Box>
    </MuiPickersUtilsProvider>
  );
});

export { FormDateRangePicker };
