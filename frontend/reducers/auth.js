import { actionTypes } from '../actions/actionTypes';

const initialState = {
  user: null
};
export const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.authTypes.LOGIN_USER:
      return {
        ...state,
        user: action.payload
      };
    case actionTypes.authTypes.LOGOUT_USER:
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
};
