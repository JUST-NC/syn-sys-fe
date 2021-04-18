import React, { ReactNode } from 'react';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormLabel, { FormLabelProps } from '@material-ui/core/FormLabel';
import {
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonGroupProps,
} from '@material-ui/lab';
import { Field, useField } from 'react-final-form';
import { ShowErrorProps } from 'mui-rff/src/Util';
import { showErrorOnChange } from 'mui-rff';
import tw, { css } from 'twin.macro';

type ShowErrorFunc = (props: ShowErrorProps) => boolean;

export interface Option {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
}

export interface FormRadioGroupProps {
  name: string;
  label: string;
  options: Option[];
  formControlProps?: Omit<FormControlProps, 'required' | 'error'>;
  formLabelProps?: FormLabelProps;
  toggleButtonGroupProps?: ToggleButtonGroupProps;
  required?: boolean;
  SelectedNode?: React.FC;
  UnselectedNode?: React.FC;
  showError?: ShowErrorFunc;
  withPadding?: boolean;
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = (props) => {
  const {
    name,
    label,
    options,
    required,
    formControlProps,
    formLabelProps,
    toggleButtonGroupProps,
    SelectedNode,
    UnselectedNode,
    withPadding = true,
    showError = showErrorOnChange,
  } = props;

  const field = useField(name);
  const isError = showError(field);

  return (
    <>
      <FormControl required={required} error={isError} {...formControlProps}>
        <FormLabel {...formLabelProps}>{label}</FormLabel>
        <Field name={name}>
          {({ input: { name, value, onChange, checked, ...inputProps } }) => (
            <ToggleButtonGroup
              tw={'mt-3'}
              exclusive={true}
              value={value}
              onChange={onChange}
              {...toggleButtonGroupProps}
            >
              {options.map((option, i) => (
                <ToggleButton
                  key={i}
                  value={option.value}
                  name={name}
                  disabled={option.disabled}
                  disableRipple={true}
                  css={css`
                    ${withPadding && tw`py-1 px-8`}
                    ${tw`leading-4 (rounded-full border-solid border-gray-200 border-2)! mr-4 text-gray-800 transition-colors duration-75 ease-linear`}
                    &.Mui-selected {
                      ${tw`text-gray-200 (bg-gray-800 border-transparent )!`}
                    }

                    .MuiToggleButton-label {
                      ${tw`pointer-events-none`}
                    }
                  `}
                >
                  {value === option.value ? (
                    !!SelectedNode ? (
                      <SelectedNode>{option?.label} </SelectedNode>
                    ) : (
                      option?.label
                    )
                  ) : !!UnselectedNode ? (
                    <UnselectedNode>{option?.label}</UnselectedNode>
                  ) : (
                    option?.label
                  )}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        </Field>
      </FormControl>
    </>
  );
};

export { FormRadioGroup };
