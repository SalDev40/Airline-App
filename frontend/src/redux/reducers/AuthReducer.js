import * as authActions from "../actions/AuthActions";

const initialState = {
  user: {},
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case authActions.STORE_USER:
      return {
        ...state,
        user: action.userData,
      };
    case authActions.LOG_OUT:
      return {
        ...state,
        user: {},
      };

    default: {
      return state;
    }
  }
}
