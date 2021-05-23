import React from 'react';
import { Form } from 'react-final-form';
import { makeValidate, TextField } from 'mui-rff';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import tw, { css } from 'twin.macro';
import styled from '@emotion/styled';
import { login } from '../apis/login';

interface LoginFormData {
  // 账号
  account: string;
  // 密码
  password: string;
}

const FormTextField = styled(TextField)(() => [
  tw`mb-7 h-16`,
  css`
    .MuiFilledInput-underline:before {
      ${tw`h-0.5 i-bg-default`}
      border-bottom: unset;
    }
  `,
]);

const FormButton = tw(Button)`py-5 px-20 text-lg text-white rounded-full i-bg-default`;

// 这里要注意加上 AnySchema 类型，不然 TS 没法正确推导（其实现在也不是正确推导）
const schema: Yup.AnySchema = Yup.object().shape({
  account: Yup.string().required('你怎么可以不填账号呢？！'),
  password: Yup.string()
    .min(8, '密码不能少于 8 位')
    .max(20, '密码不能超过 20 位')
    .required('你怎么可以不填密码呢？！'),
});

const validate = makeValidate(schema);

const LoginForm: React.FC = () => {
  // TODO: 完成提交接口设计
  const onSubmit = async (data: LoginFormData) => {
    login(data);
  };

  return (
    <Form onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit }) => (
        <form tw={'flex flex-col justify-center items-center'} onSubmit={handleSubmit}>
          <FormTextField
            margin={'normal'}
            variant={'filled'}
            label={'账号'}
            name={'account'}
            required={true}
            autoComplete={'username'}
          />
          <FormTextField
            variant={'filled'}
            label={'密码'}
            name={'password'}
            required={true}
            type={'password'}
            autoComplete={'current-password'}
          />
          <Button
            tw={'py-5 px-20 text-lg text-white rounded-full i-bg-default'}
            disableElevation={true}
            variant={'contained'}
            type={'submit'}
          >
            登录
          </Button>
        </form>
      )}
    </Form>
  );
};

export { LoginForm };
