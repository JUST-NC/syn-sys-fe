import React from 'react';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { NotFound } from './pages/NotFound';
import { Login } from './pages/Login';

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
  // 是否需要精确匹配
  exact?: boolean;
}

/**
 * 路由表
 *
 * Login 在 App.tsx 中配置
 */
const route: RouteModel[] = [
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/about',
    Component: About,
  },
  {
    path: '/',
    Component: Home,
    auth: true,
    exact: true,
  },
  {
    path: '*',
    Component: NotFound,
  },
];

export { route };
