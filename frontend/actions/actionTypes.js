export const actionTypes = {
  authTypes: {
    REGISTER_USER: 'REGISTER_USER',
    LOGIN_USER: 'LOGIN_USER',
    LOGOUT_USER: 'LOGOUT_USER'
  },
  emplTypes: {
    GET_EMPLOYEES_REQUEST: 'GET_EMPLOYEES_REQUEST',
    GET_EMPLOYEES_SUCCESS: 'GET_EMPLOYEES_SUCCESS',
    GET_EMPLOYEES_COUNT: 'GET_EMPLOYEES_COUNT',
    DELETE_EMPLOYEE_SUCCESS: 'DELETE_EMPLOYEE_SUCCESS',
    CHANGE_CURR_PAGE: 'CHANGE_CURR_PAGE',
    SET_EDITABLE_EMPLOYEE: 'SET_EDITABLE_EMPLOYEE',
    CREATE_EMPLOYEE_REQUEST: 'CREATE_EMPLOYEE_REQUEST',
    CREATE_EMPLOYEE_SUCCESS: 'CREATE_EMPLOYEE_SUCCESS',
    CREATE_EMPLOYEE_ERROR: 'CREATE_EMPLOYEE_ERROR',
    UPDATE_EMPLOYEE_REQUEST: 'UPDATE_EMPLOYEE_REQUEST',
    UPDATE_EMPLOYEE_SUCCESS: 'UPDATE_EMPLOYEE_SUCCESS',
    UPDATE_EMPLOYEE_ERROR: 'UPDATE_EMPLOYEE_ERROR',
    SEARCH_EMPLOYEES_BY_NAME_REQUEST: 'SEARCH_EMPLOYEES_BY_NAME_REQUEST',
    SEARCH_EMPLOYEES_BY_NAME_SUCCESS: 'SEARCH_EMPLOYEES_BY_NAME_SUCCESS',
    CLEAN_DATA_ON_LOGOUT: 'CLEAN_DATA_ON_LOGOUT',
    OPEN_EDIT_EMPL_MODAL: 'OPEN_EDIT_EMPL_MODAL',
    CLOSE_EDIT_EMPL_MODAL: 'CLOSE_EDIT_EMPL_MODAL',
    OPEN_CREATE_EMPL_MODAL: 'OPEN_CREATE_EMPL_MODAL',
    CLOSE_CREATE_EMPL_MODAL: 'CLOSE_CREATE_EMPL_MODAL'
  },
  depsTypes: {
    GET_DEPARTMENTS: 'GET_DEPARTMENTS',
    GET_DEPARTMENTS_COUNT: 'GET_DEPARTMENTS_COUNT',
    CREATE_DEPARTMENT_REQUEST: 'CREATE_DEPARTMENT_REQUEST',
    CREATE_DEPARTMENT_SUCCESS: 'CREATE_DEPARTMENT_SUCCESS',
    CREATE_DEPARTMENT_ERROR: 'CREATE_DEPARTMENT_ERROR',
    UPDATE_DEPARTMENT_REQUEST: 'UPDATE_DEPARTMENT_REQUEST',
    UPDATE_DEPARTMENT_SUCCESS: 'UPDATE_DEPARTMENT_SUCCESS',
    UPDATE_DEPARTMENT_ERROR: 'UPDATE_DEPARTMENT_ERROR',
    DELETE_DEPARTMENT_SUCCESS: 'DELETE_DEPARTMENT_SUCCESS',
    SET_EDITABLE_DEPARTMENT: 'SET_EDITABLE_DEPARTMENT',
    SET_COLOR: 'SET_COLOR',
    CHANGE_CURR_PAGE: 'CHANGE_CURR_PAGE',
    OPEN_EDIT_DEP_MODAL: 'OPEN_EDIT_DEP_MODAL',
    CLOSE_EDIT_DEP_MODAL: 'CLOSE_EDIT_DEP_MODAL',
    OPEN_CREATE_DEP_MODAL: 'OPEN_CREATE_DEP_MODAL',
    CLOSE_CREATE_DEP_MODAL: 'CLOSE_CREATE_DEP_MODAL'
  }
};
