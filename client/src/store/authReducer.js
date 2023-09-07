// authReducer.js
import Cookies from 'js-cookie';
import { LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT, BUY_POKEMON_SUCCESS } from '../action/authAction';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const userCookie = Cookies.get('userCookie'); // Use the same cookie name as in Header.jsx

if (userCookie) {
  const userData = JSON.parse(userCookie);
  initialState.isAuthenticated = true;
  initialState.user = userData;
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case BUY_POKEMON_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
