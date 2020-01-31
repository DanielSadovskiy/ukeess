import React, { useEffect } from 'react';
import Header from '../containers/Header';
import DepTable from '../containers/DepTable';
import CreateEditDep from '../containers/CreateEditDep';
import jwt from 'jsonwebtoken';

export const ControlDepartment = ({ user, becomeAuth }) => {
  useEffect(() => {
    if (!user && localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      const user = jwt.decode(token);
      becomeAuth(user);
    }
  }, []);
  return (
    <>
      <Header />
      <DepTable />
      <CreateEditDep />
    </>
  );
};
