import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import createStore from './store';
import HomePage from './containers/HomePage';
import ControlDepartment from './containers/ControlDepartment';
import Register from './containers/Register';
import Login from './containers/Login';
import { PrivateRoute } from './helpers/PrivateRoute';
import './styles/main.scss';

const store = createStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <PrivateRoute exact path='/controldep' component={ControlDepartment} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
