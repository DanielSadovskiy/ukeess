import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';
import Header from '../containers/Header';
import EmplTable from '../containers/EmplTable';
import CreateEditEmpl from '../containers/CreateEditEmpl';

export const HomePage = ({ user, departments, becomeAuth, getDepartments }) => {
  useEffect(() => {
    if (!user && localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const user = jwt.decode(token);
      becomeAuth(user);
      if (!departments.length) {
        getDepartments();
      }
    }
  }, []);
  return (
    <div>
      {(localStorage.getItem('token') && (
        <>
          <Header />
          <EmplTable />
          <CreateEditEmpl />
        </>
      )) || <Redirect to='/register' />}
    </div>
  );
};
