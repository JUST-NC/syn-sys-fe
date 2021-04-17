import React from 'react';
import { DatePicker, DatePickerProps } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';
import { zhCN } from 'date-fns/locale';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Box from '@material-ui/core/Box';
import { FormLabel, Typography } from '@material-ui/core';
import 'twin.macro';

type DateProps = Omit<
  DatePickerProps,
  | 'label'
  | 'format'
  | 'required'
  | 'disablePast'
  | 'disableFuture'
  | 'showTodayButton'
  | 'todayLabel'
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
}

const StyledDatePicker: React.FC<DatePickerProps> = ({ ...props }) => (
  <DatePicker
    tw={'w-auto'}
    InputLabelProps={{
      shrink: true,
    }}
    {...props}
  />
);

const FormDateRangePicker: React.FC<FormDateRangePickerProps> = (props) => {
  let { label, betweenLabel, beginDateProps, endDateProps, ...commonProps } = props;

  commonProps = {
    format: commonProps.format ?? 'yyyy-MM-dd',
    todayLabel: commonProps.todayLabel ?? '回到今天',
    ...commonProps,
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={zhCN}>
        <Box>
          <FormLabel>{label}</FormLabel>
          <Box tw={'flex items-center justify-center'}>
            <StyledDatePicker {...commonProps} {...beginDateProps} />
            <Typography tw={'inline-block mx-4'}>{betweenLabel ?? '至'}</Typography>
            <StyledDatePicker {...commonProps} {...endDateProps} />
          </Box>
        </Box>
      </MuiPickersUtilsProvider>
    </>
  );
};

export { FormDateRangePicker };
