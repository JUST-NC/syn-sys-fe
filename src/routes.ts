import { Login } from './pages/Login';
import React from 'react';

export type RouteType = {
  path: string;
  component: React.FC<{ routes?: RouteType[] }>;
  routes?: RouteType[];
};

export const routes: RouteType[] = [
  {
    path: '/login',
    component: Login,
  },
];
