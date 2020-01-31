import { actionTypes } from './actionTypes';
import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'http://localhost:3000'
});

export const registerAdmin = (nickname, email, password) => async dispatch => {
  const formData = new FormData();
  formData.append('name', nickname);
  formData.append('email', email);
  formData.append('password', password);
  return baseURL
    .post('/auth/register', formData)
    .then(res => {
      return res;
    })
    .catch(error => {
      console.log(error.response.status);
      return error.response;
    });
};

export const becomeAuth = user => async dispatch => {
  dispatch({ type: actionTypes.authTypes.LOGIN_USER, payload: user });
};

export const loginAdmin = (email, password) => async dispatch => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('password', password);
  return baseURL
    .post('/auth/login', formData)
    .then(res => {
      dispatch({ type: actionTypes.authTypes.LOGIN_USER, payload: res.data.user });
      return res;
    })
    .catch(error => {
      console.log(error.response.status);
      return error.response;
    });
};

export const Logout = () => async dispatch => {
  dispatch({ type: actionTypes.authTypes.LOGOUT_USER });
};
