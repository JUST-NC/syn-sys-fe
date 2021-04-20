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
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import { css } from '@emotion/react';
import tw from 'twin.macro';

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
  formControlProps?: Partial<FormControlProps>;
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
    css={css`
      .MuiInput-input {
        ${tw`text-center i-color`}
      }

      .MuiInput-formControl {
        ${tw`before:(border-none!) after:(border-none!)`}
      }
    `}
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
 *
 * FIXME: DatePicker 会报一个 warning 暂时没解决
 */
const FormDateRangePicker = observer<FormDateRangePickerProps>((props) => {
  let {
    label,
    beginDateProps,
    endDateProps,
    formControlProps,
    required = false,
    betweenLabel = '至',
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
    <FormControl
      tw={'mb-8 flex border-b-2 border-gray-100 border-solid'}
      required={required}
      {...formControlProps}
    >
      <FormLabel tw={'text-gray-500'}>{label}</FormLabel>
      <Box tw={'flex items-center pt-8'}>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhCN}>
          <StyledDatePicker {...commonProps} {...beginDateProps} />
          <Typography tw={'inline-block mx-4 text-gray-400'}>{betweenLabel}</Typography>
          <StyledDatePicker {...commonProps} {...endDateProps} />
        </MuiPickersUtilsProvider>
      </Box>
    </FormControl>
  );
});

export { FormDateRangePicker };
