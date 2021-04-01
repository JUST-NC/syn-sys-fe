import React from 'react';
import { Form } from 'react-final-form';
import { makeValidate, TextField } from 'mui-rff';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import styled from 'styled-components';

interface LoginFormData {
  // 账号
  account: string;
  // 密码
  password: string;
}

const StyledForm = styled('form')`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
`;

const FormTextField = styled(TextField)`
  margin-bottom: 30px;
  height: 60px;

  .MuiFilledInput-underline:before {
    border-bottom: unset;
    background: linear-gradient(130deg, #ff7a18, #af002d 41.07%, #319197 76.05%);
    height: 2px;
  }
`;

const FormButton = styled(Button)`
  background: linear-gradient(130deg, #ff7a18, #af002d 41.07%, #319197 76.05%);
  padding: 16px 70px;
  border-radius: 70px;
  color: white;
  font-size: larger;
`;

const LoginForm: React.FC = () => {
  // TODO: 完成提交接口设计
  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
  };

  // 这里要注意加上 AnySchema 类型，不然 TS 没法正确推导（其实现在也不是正确推导）
  const schema: Yup.AnySchema = Yup.object().shape({
    account: Yup.string().required('你怎么可以不填账号呢？！'),
    password: Yup.string()
      .min(8, '密码不能少于 8 位')
      .max(20, '密码不能超过 20 位')
      .required('你怎么可以不填密码呢？！'),
  });

  const validate = makeValidate(schema);

  return (
    <Form onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit }) => (
        <StyledForm onSubmit={handleSubmit}>
          <FormTextField
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
          <FormButton disableElevation={true} variant={'contained'} type={'submit'}>
            登录
          </FormButton>
        </StyledForm>
      )}
    </Form>
  );
};

export { LoginForm };
