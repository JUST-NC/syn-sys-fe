import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { routes, RouteType } from './routes';

const RouteWithSubRoutes = (route: RouteType) => {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
};

function App() {
  let isLogin = false;
  return (
    <BrowserRouter>
      <Switch>
        {!isLogin && <Redirect exact from="/" to="/login" />}
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
