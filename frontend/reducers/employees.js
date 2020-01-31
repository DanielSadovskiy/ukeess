import { actionTypes } from '../actions/actionTypes';

const initialState = {
  employees: [],
  currPage: 1,
  totalPages: null,
  totalEmployees: null,
  createEmplModalIsOpen: false,
  editEmplModalIsOpen: false,
  editableEmpl: null,
  isFetching: false,
  startsWith: '',
  wasDeleted: false
};
export const employees = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.emplTypes.GET_EMPLOYEES_REQUEST:
      return {
        ...state
      };
    case actionTypes.emplTypes.GET_EMPLOYEES_SUCCESS:
      return {
        ...state,
        employees: [...action.payload],
        wasDeleted: false
      };
    case actionTypes.emplTypes.GET_EMPLOYEES_COUNT: {
      return {
        ...state,
        totalEmployees: action.payload.totalCount,
        totalPages: Math.ceil(action.payload.totalCount / 4)
      };
    }
    case actionTypes.emplTypes.CHANGE_CURR_PAGE: {
      return {
        ...state,
        currPage: action.payload
      };
    }
    case actionTypes.emplTypes.DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        totalEmployees: state.totalEmployees - 1,
        totalPages: Math.ceil((state.totalEmployees - 1) / 4),
        employees: state.employees.filter(empl => empl.id !== action.payload),
        wasDeleted: true
      };
    case actionTypes.emplTypes.SET_EDITABLE_EMPLOYEE: {
      return {
        ...state,
        editableEmpl: state.employees.find(empl => empl.id === action.payload)
      };
    }
    case actionTypes.emplTypes.CREATE_EMPLOYEE_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case actionTypes.emplTypes.CREATE_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        employees: [action.payload, ...state.employees],
        totalPages: Math.ceil((state.totalEmployees + 1) / 4),
        totalEmployees: state.totalEmployees + 1
      };
    }
    case actionTypes.emplTypes.CREATE_EMPLOYEE_ERROR: {
      return {
        ...state,
        isFetching: false
      };
    }
    case actionTypes.emplTypes.UPDATE_EMPLOYEE_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case actionTypes.emplTypes.UPDATE_EMPLOYEE_SUCCESS: {
      return {
        ...state,
        employees: state.employees.map(empl =>
          empl.id === action.payload.id ? action.payload : empl
        ),
        isFetching: false
      };
    }
    case actionTypes.emplTypes.UPDATE_EMPLOYEE_ERROR: {
      return {
        ...state,
        isFetching: false
      };
    }
    case actionTypes.emplTypes.SEARCH_EMPLOYEES_BY_NAME_REQUEST: {
      return {
        ...state,
        currPage: 1
      };
    }
    case actionTypes.emplTypes.SEARCH_EMPLOYEES_BY_NAME_SUCCESS: {
      return {
        ...state,
        startsWith: action.payload
      };
    }
    case actionTypes.emplTypes.CLEAN_DATA_ON_LOGOUT:
      return {
        ...state,
        employees: [],
        currPage: null,
        totalPages: null,
        totalEmployees: null
      };
    case actionTypes.emplTypes.OPEN_EDIT_EMPL_MODAL:
      return {
        ...state,
        editEmplModalIsOpen: true
      };
    case actionTypes.emplTypes.CLOSE_EDIT_EMPL_MODAL:
      return {
        ...state,
        editEmplModalIsOpen: false,
        editableEmpl: null
      };
    case actionTypes.emplTypes.OPEN_CREATE_EMPL_MODAL:
      return {
        ...state,
        createEmplModalIsOpen: true
      };
    case actionTypes.emplTypes.CLOSE_CREATE_EMPL_MODAL:
      return {
        ...state,
        createEmplModalIsOpen: false
      };
    default:
      return state;
  }
};
