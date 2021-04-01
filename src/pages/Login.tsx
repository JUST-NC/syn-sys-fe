import { Helmet } from 'react-helmet-async';
import { LoginForm } from '../components/LoginForm';
import { Link, Paper, Typography } from '@material-ui/core';
import React from 'react';
import styles from '../styles/Login.module.scss';
import Div100vh from 'react-div-100vh';
import classNames from 'classnames';
import { Link as RouterLink } from 'react-router-dom';
import { HOME_PAGE } from '../routes';

const Login: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>登录</title>
      </Helmet>

      <Paper className={styles.loginPaper} component={Div100vh}>
        <div>
          <Typography
            className={classNames('text-gray-500')}
            variant={'h6'}
            gutterBottom={true}
          >
            江苏科技大学
          </Typography>
          <Typography
            className={classNames('text-gray-800')}
            variant={'h3'}
            gutterBottom={true}
          >
            欢迎回来
          </Typography>
        </div>

        <div>
          <LoginForm />
        </div>

        <div className={classNames('text-center')}>
          <Link color={'initial'} component={RouterLink} to={HOME_PAGE.path}>
            忘记密码？
          </Link>
        </div>
      </Paper>
    </>
  );
};

export { Login };
