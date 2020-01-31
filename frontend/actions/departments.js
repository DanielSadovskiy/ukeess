import { actionTypes } from './actionTypes';
import axios from 'axios';

const baseURL = axios.create({
  baseURL: 'http://localhost:3000'
});

export const getDepartments = (page, count) => async dispatch => {
  return baseURL
    .get('/getdepartments', { params: { page: page, count: count } })
    .then(res => {
      dispatch({ type: actionTypes.depsTypes.GET_DEPARTMENTS, payload: res.data });
      return res;
    })
    .catch(error => {
      console.log(error.response.status);
      return error.response;
    });
};
export const getDepartmentsCount = () => async dispatch => {
  return baseURL
    .get('/getdepartmentscount')
    .then(res => {
      dispatch({ type: actionTypes.depsTypes.GET_DEPARTMENTS_COUNT, payload: res.data });
      return res;
    })
    .catch(error => {
      console.log(error.response.status);
      return error.response;
    });
};

export const deleteDepartment = id => async dispatch => {
  if (
    window.confirm('do you really want to delete department and all employees connected to it? ')
  ) {
    return baseURL
      .delete('/deletedep', { data: { id: id } })
      .then(res => {
        if (res.data.employees) {
          res.data.employees.forEach(empl => {
            dispatch({
              type: actionTypes.emplTypes.DELETE_EMPLOYEE_SUCCESS,
              payload: empl
            });
          });
        }

        dispatch({
          type: actionTypes.depsTypes.DELETE_DEPARTMENT_SUCCESS,
          payload: res.data.department
        });
        return res;
      })
      .catch(error => {
        console.log(error.response.status);
        return error.response;
      });
  }
};
export const createDepartment = name => async dispatch => {
  dispatch({ type: actionTypes.depsTypes.CREATE_DEPARTMENT_REQUEST });
  return baseURL
    .post('/createdep', { name: name })
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: actionTypes.depsTypes.CREATE_DEPARTMENT_SUCCESS, payload: res.data });
        return res;
      }
    })
    .catch(e => {
      dispatch({ type: actionTypes.depsTypes.CREATE_DEPARTMENT_ERROR });
      return e.response;
    });
};
export const updateDepartment = (id, name) => async dispatch => {
  dispatch({ type: actionTypes.depsTypes.UPDATE_DEPARTMENT_REQUEST });
  return baseURL
    .put('/updatedep', { id: id, name: name })
    .then(res => {
      if (res.status === 200) {
        dispatch({ type: actionTypes.depsTypes.UPDATE_DEPARTMENT_SUCCESS, payload: res.data });
      }
    })
    .catch(e => {
      dispatch({ type: actionTypes.depsTypes.UPDATE_DEPARTMENT_ERROR });
      return e.response;
    });
};

export const setEditableDepartment = id => async dispatch => {
  dispatch({ type: actionTypes.depsTypes.SET_EDITABLE_DEPARTMENT, payload: id });
};
export const changeCurrPage = currPage => async dispatch => {
  dispatch({ type: actionTypes.depsTypes.CHANGE_CURR_PAGE, payload: currPage });
};
export const openEditDepModal = () => async dispatch => {
  dispatch({ type: actionTypes.depsTypes.OPEN_EDIT_DEP_MODAL });
};
export const closeEditDepModal = () => async dispatch => {
  dispatch({ type: actionTypes.depsTypes.CLOSE_EDIT_DEP_MODAL });
};
export const openCreateDepModal = () => async dispatch => {
  dispatch({ type: actionTypes.depsTypes.OPEN_CREATE_DEP_MODAL });
};
export const closeCreateDepModal = () => async dispatch => {
  dispatch({ type: actionTypes.depsTypes.CLOSE_CREATE_DEP_MODAL });
};
