import { FieldMetaState } from 'react-final-form';
import FormHelperText, { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import React from 'react';

/**
 * 从 mui-rff 的 Util.tsx 中提取出来的一些类型和组件，方便自己包装一些接口
 */

export interface ShowErrorProps {
  meta: FieldMetaState<any>;
}

export interface ErrorMessageProps {
  showError: boolean;
  meta: FieldMetaState<any>;
  formHelperTextProps?: Partial<FormHelperTextProps>;
  helperText?: string;
}

export type ShowErrorFunc = (props: ShowErrorProps) => boolean;

const showErrorOnChange: ShowErrorFunc = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched, modified },
}) => !!(((submitError && !dirtySinceLastSubmit) || error) && (touched || modified));

const showErrorOnBlur: ShowErrorFunc = ({
  meta: { submitError, dirtySinceLastSubmit, error, touched },
}) => !!(((submitError && !dirtySinceLastSubmit) || error) && touched);

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  showError,
  meta,
  formHelperTextProps,
  helperText,
}) => {
  if (showError) {
    return (
      <FormHelperText {...formHelperTextProps}>
        {meta.error || meta.submitError}
      </FormHelperText>
    );
  } else if (!!helperText) {
    return <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>;
  } else {
    return <></>;
  }
};

export { showErrorOnChange, showErrorOnBlur, ErrorMessage };
