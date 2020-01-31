import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { notification } from 'antd';

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: type,
    description: message
  });
};

export const PrivateRoute = ({ history, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (localStorage.getItem('token')) {
        return <Component {...props} />;
      } else {
        openNotificationWithIcon('error', 'You are not authorized!');
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location }
            }}
          />
        );
      }
    }}
  />
);
