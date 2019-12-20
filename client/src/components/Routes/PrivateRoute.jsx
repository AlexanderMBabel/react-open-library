import React from 'react';
import { Route } from 'react-router-dom';
import { useAuthContext } from '../Sessions/context';
import Login from '../auth/Login';

const PrivateRoute = ({ component, ...options }) => {
  const authUser = useAuthContext();
  const finalComponent = authUser ? component : Login;

  return <Route {...options} component={finalComponent} />;
};

export default PrivateRoute;
