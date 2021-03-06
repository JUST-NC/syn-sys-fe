import React from 'react';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';
import { Test } from './pages/Test';

import { ResetPassword } from './pages/ResetPassword';
import { LeaveApplication } from './pages/LeaveApplication';
import { FormHistory } from './pages/FormHistory';

export interface RouteModel {
  // 路由路径
  path: string;
  // 路由组件
  // TODO: 考虑是否需要异步加载、按需加载
  Component: React.FC<{ routes?: RouteModel[] }>;
  // 子路由，默认 undefined
  routes?: RouteModel[];
  // 是否需要认证，默认 false，在拦截器中处理
  auth?: boolean;
  // 是否需要精确匹配，默认 false，在拦截器中处理
  exact?: boolean;
}

/**
 * 路由表
 *
 *!!! 完成配置后别忘了加到下方的数组、导出模块中
 */
const LOGIN_PAGE: RouteModel = {
  path: '/login',
  Component: Login,
};

const RESET_PASSWORD_PAGE: RouteModel = {
  path: '/reset_password',
  Component: ResetPassword,
};

const ABOUT_PAGE: RouteModel = {
  path: '/about',
  Component: About,
};

const FORM_HISTORY_PAGE: RouteModel = {
  path: '/form_history',
  Component: FormHistory,
};

const TEST_PAGE: RouteModel = {
  path: '/test',
  Component: Test,
};

const LEAVE_APPLICATION_PAGE: RouteModel = {
  path: '/leave_application',
  Component: LeaveApplication,
};

const HOME_PAGE: RouteModel = {
  path: '/',
  Component: Home,
  // auth: true,
  exact: true,
};

const NOT_FOUND_PAGE: RouteModel = {
  path: '*',
  Component: NotFound,
};

const route: RouteModel[] = [
  LOGIN_PAGE,
  TEST_PAGE,
  RESET_PASSWORD_PAGE,
  ABOUT_PAGE,
  FORM_HISTORY_PAGE,
  LEAVE_APPLICATION_PAGE,
  HOME_PAGE,
  NOT_FOUND_PAGE,
];

export {
  LOGIN_PAGE,
  RESET_PASSWORD_PAGE,
  ABOUT_PAGE,
  FORM_HISTORY_PAGE,
  TEST_PAGE,
  LEAVE_APPLICATION_PAGE,
  HOME_PAGE,
  NOT_FOUND_PAGE,
  route,
};
