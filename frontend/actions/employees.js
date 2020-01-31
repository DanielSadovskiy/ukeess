import { actionTypes } from './actionTypes';
import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'http://localhost:3000'
});

export const getEmployees = (page, count, startsWith) => async dispatch => {
  return baseURL
    .get('/getemployees', { params: { page: page, count: count, startsWith: startsWith } })
    .then(res => {
      dispatch({
        type: actionTypes.emplTypes.GET_EMPLOYEES,
        payload: res.data
      });
      return res;
    })
    .catch(error => {
      console.log(error.response.status);
      return error.response;
    });
};
export const getEmployeesCount = startsWith => async dispatch => {
  return baseURL
    .get('/getemployeescount', { params: { startsWith: startsWith } })
    .then(res => {
      dispatch({ type: actionTypes.emplTypes.GET_EMPLOYEES_COUNT, payload: res.data });
      return res;
    })
    .catch(error => {
      console.log(error.response.status);
      return error.response;
    });
};
export const changeCurrPage = currPage => async dispatch => {
  dispatch({ type: actionTypes.emplTypes.CHANGE_CURR_PAGE, payload: currPage });
};
export const deleteEmployee = id => async dispatch => {
  return baseURL.delete('/deleteempl', { data: { id: id } }).then(res => {
    if (res.status === 200) {
      dispatch({ type: actionTypes.emplTypes.DELETE_EMPLOYEE_SUCCESS, payload: id });
    }
  });
};
export const setEditableEmployee = id => async dispatch => {
  dispatch({ type: actionTypes.emplTypes.SET_EDITABLE_EMPLOYEE, payload: id });
};
export const createEmployee = (name, active, department) => async dispatch => {
  dispatch({ type: actionTypes.emplTypes.CREATE_EMPLOYEE_REQUEST });
  return baseURL
    .post('/createemployee', { name: name, active: active, department: department })
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: actionTypes.emplTypes.CREATE_EMPLOYEE_SUCCESS, payload: res.data });
        return res;
      }
    })
    .catch(e => {
      dispatch({ type: actionTypes.emplTypes.CREATE_EMPLOYEE_ERROR });
      return e.response;
    });
};
export const updateEmployee = (id, name, active, department) => async dispatch => {
  dispatch({ type: actionTypes.emplTypes.UPDATE_EMPLOYEE_REQUEST });
  return baseURL
    .put('/updateempl', { id: id, name: name, active: active, department: department })
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: actionTypes.emplTypes.UPDATE_EMPLOYEE_SUCCESS, payload: res.data });
        return res;
      }
    })
    .catch(e => {
      dispatch({ type: actionTypes.emplTypes.UPDATE_EMPLOYEE_ERROR });
      return e.response;
    });
};
export const searchEmplsByName = nameStartWith => async dispatch => {
  dispatch({ type: actionTypes.emplTypes.SEARCH_EMPLOYEES_BY_NAME_REQUEST });
  dispatch({
    type: actionTypes.emplTypes.SEARCH_EMPLOYEES_BY_NAME_SUCCESS,
    payload: nameStartWith
  });
};

export const clearDataOnLogout = () => async dispatch => {
  dispatch({ type: actionTypes.emplTypes.CLEAN_DATA_ON_LOGOUT });
};
export const openEditEmplModal = () => async dispatch => {
  dispatch({ type: actionTypes.emplTypes.OPEN_EDIT_EMPL_MODAL });
};
export const closeEditEmplModal = () => async dispatch => {
  dispatch({ type: actionTypes.emplTypes.CLOSE_EDIT_EMPL_MODAL });
};
export const openCreateEmplModal = () => async dispatch => {
  dispatch({ type: actionTypes.emplTypes.OPEN_CREATE_EMPL_MODAL });
};
export const closeCreateEmplModal = () => async dispatch => {
  dispatch({ type: actionTypes.emplTypes.CLOSE_CREATE_EMPL_MODAL });
};
