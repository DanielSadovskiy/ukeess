import { actionTypes } from '../actions/actionTypes';

const initialState = {
  departments: [],
  totalDepartments: 0,
  totalPages: 0,
  colors: {},
  createDepModalIsOpen: false,
  editDepModalIsOpen: false,
  editableDep: null,
  isFetching: false,
  currPage: 1,
  wasDeleted: false
};
function generateColor(ranges) {
  if (!ranges) {
    ranges = [[150, 256], [0, 190], [0, 30]];
  }
  var g = function() {
    var range = ranges.splice(Math.floor(Math.random() * ranges.length), 1)[0];
    return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
  };
  return 'rgb(' + g() + ',' + g() + ',' + g() + ')';
}
export const departments = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.depsTypes.GET_DEPARTMENTS:
      return {
        ...state,
        departments: [...action.payload],

        wasDeleted: false,
        colors: action.payload.reduce(
          (acc, dep) => ({
            ...acc,
            [dep.name]: generateColor()
          }),
          {}
        )
      };
    case actionTypes.depsTypes.GET_DEPARTMENTS_COUNT:
      return {
        ...state,
        totalDepartments: action.payload.totalCount,
        totalPages: Math.ceil(action.payload.totalCount / 4)
      };

    case actionTypes.depsTypes.CREATE_DEPARTMENT_REQUEST:
      return {
        ...state,
        isFetching: true
      };

    case actionTypes.depsTypes.CREATE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        departments: [action.payload, ...state.departments],
        totalPages: Math.ceil((state.totalDepartments + 1) / 4),
        totalDepartments: state.totalDepartments + 1
      };

    case actionTypes.depsTypes.CREATE_DEPARTMENT_ERROR: {
      return {
        ...state,
        isFetching: false
      };
    }
    case actionTypes.depsTypes.UPDATE_DEPARTMENT_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }
    case actionTypes.depsTypes.UPDATE_DEPARTMENT_SUCCESS: {
      return {
        ...state,
        departments: state.departments.map(dep =>
          dep.id === action.payload.id ? action.payload : dep
        ),
        isFetching: false
      };
    }
    case actionTypes.depsTypes.UPDATE_DEPARTMENT_ERROR: {
      return {
        ...state,
        isFetching: false
      };
    }
    case actionTypes.depsTypes.DELETE_DEPARTMENT_SUCCESS:
      return {
        ...state,
        departments: state.departments.filter(dep => dep.id !== action.payload.id),
        wasDeleted: true
      };
    case actionTypes.depsTypes.SET_EDITABLE_DEPARTMENT:
      return {
        ...state,
        editableDep: state.departments.find(empl => empl.id === action.payload)
      };
    case actionTypes.depsTypes.CHANGE_CURR_PAGE: {
      return {
        ...state,
        currPage: action.payload
      };
    }
    case actionTypes.depsTypes.OPEN_EDIT_DEP_MODAL:
      return {
        ...state,
        editDepModalIsOpen: true
      };
    case actionTypes.depsTypes.CLOSE_EDIT_DEP_MODAL:
      return {
        ...state,
        editDepModalIsOpen: false,
        editableDep: null
      };
    case actionTypes.depsTypes.OPEN_CREATE_DEP_MODAL:
      return {
        ...state,
        createDepModalIsOpen: true
      };
    case actionTypes.depsTypes.CLOSE_CREATE_DEP_MODAL:
      return {
        ...state,
        createDepModalIsOpen: false
      };
    default:
      return state;
  }
};
