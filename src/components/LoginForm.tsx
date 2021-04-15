import React from 'react';
import { Form } from 'react-final-form';
import { makeValidate } from 'mui-rff';
import * as Yup from 'yup';
import { FormTextField } from './FormTextField';
import { FormButton } from './FormButton';
import 'twin.macro';

interface LoginFormData {
  // 账号
  account: string;
  // 密码
  password: string;
}

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
    console.log(data);
  };

  return (
    <Form onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit }) => (
        <form tw={'flex flex-col justify-center items-center'} onSubmit={handleSubmit}>
          <FormTextField
            label={'账号'}
            name={'account'}
            required={true}
            autoComplete={'username'}
          />
          <FormTextField
            label={'密码'}
            name={'password'}
            required={true}
            type={'password'}
            autoComplete={'current-password'}
          />
          <FormButton type={'submit'} size={'medium'}>
            登录
          </FormButton>
        </form>
      )}
    </Form>
  );
};

export { LoginForm };
