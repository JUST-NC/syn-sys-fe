import React from 'react';
import { Form } from 'react-final-form';
import { makeValidate } from 'mui-rff';
import * as Yup from 'yup';
import tw, { css } from 'twin.macro';
import styled from '@emotion/styled';
import { FormTextField } from './FormTextField';
import { FormButton } from './FormButton';
import 'twin.macro';
import { HOME_PAGE } from '../routes';
import { utils } from '../apis/utils';
import { AxiosResponse } from 'axios';
import { ResponseModel } from '../models/response-model';
import { useCookies } from 'react-cookie';
import { BasicUser, UserModel } from '../models/user-model';
import localforage from 'localforage';

interface LoginFormData {
  // 账号
  username: string;
  // 密码
  password: string;
}

interface LoginResponseModel extends ResponseModel {
  token: string;
}

interface InfoResponseModel extends ResponseModel {
  permissions: string[];
  roles: string[];
  user: UserModel;
}

// 这里要注意加上 AnySchema 类型，不然 TS 没法正确推导（其实现在也不是正确推导）
const schema: Yup.AnySchema = Yup.object().shape({
  username: Yup.string().required('你怎么可以不填账号呢？！'),
  password: Yup.string()
    .min(8, '密码不能少于 8 位')
    .max(20, '密码不能超过 20 位')
    .required('你怎么可以不填密码呢？！'),
});

const validate = makeValidate(schema);

const LOGIN = 'dev-api/login';
const GET_INFO = 'dev-api/getInfo';

const TOKEN_NAME = 'Admin-Token';

const LoginForm: React.FC = () => {
  const [cookies, setCookie] = useCookies([TOKEN_NAME]);

  // TODO: 完成提交接口设计
  const onSubmit = (data: LoginFormData) =>
    utils
      .post<LoginFormData, LoginResponseModel>(LOGIN, data)
      .then((res) => {
        setCookie(TOKEN_NAME, res.token, { path: '/' });
        return localforage
          .setItem('token', res.token)
          .then(() => utils.get<InfoResponseModel>(GET_INFO));
      })
      .then((res) => {
        localforage.setItem('user-info', res);
        console.log('done');
      });

  return (
    <Form onSubmit={onSubmit} validate={validate}>
      {({ handleSubmit }) => (
        <form tw={'flex flex-col justify-center items-center'} onSubmit={handleSubmit}>
          <FormTextField
            label={'账号'}
            name={'username'}
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
