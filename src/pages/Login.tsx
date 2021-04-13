import { Helmet } from 'react-helmet-async';
import { LoginForm } from '../components/LoginForm';
import { Link, Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { HOME_PAGE } from '../routes';
import tw from 'twin.macro';
import Div100vh from 'react-div-100vh';

const Block = tw.div`mb-20`;

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>登录</title>
      </Helmet>

      <Paper elevation={0} component={Div100vh} tw={'py-20 px-10'}>
        <Block>
          <Typography tw={'text-gray-400'} variant={'h6'} gutterBottom={true}>
            江苏科技大学
          </Typography>
          <Typography tw={'i-color'} variant={'h3'} gutterBottom={true}>
            欢迎回来！
          </Typography>
        </Block>

        <Block>
          <LoginForm />
        </Block>

        <Block tw={'text-center -mt-10'}>
          <Link
            tw={'text-gray-400'}
            color={'initial'}
            component={RouterLink}
            to={HOME_PAGE.path}
          >
            忘记密码？
          </Link>
        </Block>
      </Paper>
    </>
  );
};

export { Login };
