import { Helmet } from 'react-helmet-async';
import { LoginForm } from '../components/LoginForm';
import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import styles from '../styles/Login.module.scss';
import Div100vh from 'react-div-100vh';

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>登录</title>
      </Helmet>

      <Paper className={styles.loginPaper} component={Div100vh}>
        <div>
          <Typography variant={'h6'} gutterBottom={true}>
            江苏科技大学
          </Typography>
          <Typography variant={'h3'} gutterBottom={true}>
            欢迎回来
          </Typography>
        </div>

        <div>
          <LoginForm />
        </div>
      </Paper>
    </>
  );
};

export { Login };
