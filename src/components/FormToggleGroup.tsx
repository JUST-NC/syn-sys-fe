import React, { ReactNode } from 'react';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormLabel, { FormLabelProps } from '@material-ui/core/FormLabel';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup, {
  ToggleButtonGroupProps,
} from '@material-ui/lab/ToggleButtonGroup';
import { Field, useField } from 'react-final-form';
import tw, { css } from 'twin.macro';
import { FormHelperTextProps } from '@material-ui/core';
import { ErrorMessage, ShowErrorFunc, showErrorOnChange } from '../utils/error-msg';

export interface Toggle {
  value: string;
  label?: ReactNode;
  disabled?: boolean;
}

export interface FormToggleGroupProps {
  // 字段名
  name: string;
  // 显示的标签
  label: string;
  // 切换用的选项
  toggles: Toggle[];
  formControlProps?: Partial<Omit<FormControlProps, 'required' | 'error'>>;
  formLabelProps?: Partial<FormLabelProps>;
  toggleButtonGroupProps?: Partial<ToggleButtonGroupProps>;
  formHelperTextProps?: Partial<FormHelperTextProps>;
  helperText?: string;
  // 选择时的包装用组件
  SelectedNode?: React.FC;
  // 未选择时的包装用组件
  UnselectedNode?: React.FC;
  /**
   * 显示错误的函数
   * @default showErrorOnChange
   */
  showError?: ShowErrorFunc;
  /**
   * 要不要带内边距
   * @default true
   */
  withPadding?: boolean;
  /**
   * 是否必须
   * @default false
   */
  required?: boolean;
  /**
   * 是否单选
   * @default true
   */
  exclusive?: boolean;
}

/**
 * 包装组件
 *
 * 存在包装用的 Node 时对内部元素进行包装，不存在时直接返回内部元素
 *
 * @param Node 用于包装的组件
 * @param children 内部的元素
 * @constructor
 */
const Wrapper: React.FC<{ Node?: React.FC }> = ({ Node, children }) => {
  return <>{!!Node ? <Node>{children}</Node> : children}</>;
};

/**
 * 切换选项组件
 *
 * 主要目的是在手机界面上代替单选和复选控件来使用
 * @param props {@inheritDoc FormToggleGroupProps}
 * @constructor
 */
const FormToggleGroup: React.FC<FormToggleGroupProps> = (props) => {
  const {
    name,
    label,
    toggles,
    formControlProps,
    formLabelProps,
    toggleButtonGroupProps,
    SelectedNode,
    UnselectedNode,
    formHelperTextProps,
    helperText,
    exclusive = true,
    required = false,
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
          {({ input: { name, value, onChange } }) => (
            <ToggleButtonGroup
              tw={'mt-3'}
              exclusive={exclusive}
              value={value}
              onChange={onChange}
              {...toggleButtonGroupProps}
            >
              {toggles.map((option, i) => (
                <ToggleButton
                  key={i}
                  value={option.value}
                  name={name}
                  disabled={option.disabled}
                  disableRipple={true}
                  css={css`
                    // 带 padding 选项，不带 padding 主要是方便写圆形的组件
                    ${withPadding && tw`py-1 px-8`}
                    ${tw`leading-4 (rounded-full border-solid border-gray-200 border-2)! mr-4 text-gray-800 transition-colors duration-75 ease-linear`}
                      // 选中后样式
                    &.Mui-selected {
                      ${tw`text-gray-200 (bg-gray-800 border-transparent )!`}
                    }

                    // 穿透 label，使 label 部分可点击
                    .MuiToggleButton-label {
                      ${tw`pointer-events-none`}
                    }
                  `}
                >
                  {value === option.value ? (
                    <Wrapper Node={SelectedNode}>{option.label}</Wrapper>
                  ) : (
                    <Wrapper Node={UnselectedNode}>{option.label}</Wrapper>
                  )}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          )}
        </Field>
        <ErrorMessage
          showError={isError}
          meta={field.meta}
          formHelperTextProps={formHelperTextProps}
          helperText={helperText}
        />
      </FormControl>
    </>
  );
};

export { FormToggleGroup };
