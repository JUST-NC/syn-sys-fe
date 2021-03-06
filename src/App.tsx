import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { HOME_PAGE, LOGIN_PAGE, route, RouteModel } from './routes';
import { observer } from 'mobx-react-lite';
import { userStore } from './stores/user-store';

/**
 * 带二级路由的路由组件
 *
 * TODO: 实现二级路由的部分
 */
const RouteWithSubRoutes = observer(
  ({ Component, path, auth = false, exact = false, ...rest }: RouteModel) => (
    <Route exact={exact} path={path}>
      {({ location }) => {
        // 需要认证 且 未登录
        if (auth && !userStore.logged) {
          return <Redirect to={LOGIN_PAGE.path} />;
        }
        //  已登录 且 路径为 /login
        else if (userStore.logged && location.pathname === LOGIN_PAGE.path) {
          return <Redirect to={HOME_PAGE.path} />;
        } else {
          return <Component {...rest} />;
        }
      }}
    </Route>
  ),
);

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {route.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

export default App;
