import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Switch, Route } from 'react-router-dom';
import AuthLayout from '../container/profile/authentication/Index';

const Login = lazy(() => import('../container/profile/authentication/overview/SignIn'));
const SignUp = lazy(() => import('../container/profile/authentication/overview/Signup'));

// const NotFound = () => {
//   return <Redirect to="/" />;
// };

const FrontendRoutes = () => {
  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={SignUp} />
      </Suspense>
    </Switch>
  );
};

export default AuthLayout(FrontendRoutes);
