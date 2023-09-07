import axios from 'axios';
import Cookies from 'js-cookie';

// Action Types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const LOGOUT = 'LOGOUT';
export const BUY_POKEMON_SUCCESS = 'BUY_POKEMON_SUCCESS';
export const BUY_POKEMON_FAILURE = 'BUY_POKEMON_FAILURE';
export const FETCH_USERDATA_SUCCESS = 'FETCH_USERDATA_SUCCESS';
export const FETCH_USERDATA_FAILURE = 'FETCH_USERDATA_FAILURE';

// Action Creators
export const loginSuccess = (user) => {
    return { type: LOGIN_SUCCESS, payload: user };
};

export const loginFailure = (error) => {
    return { type: LOGIN_FAILURE, payload: error };
};

export const registerSuccess = (user) => {
    return { type: REGISTER_SUCCESS, payload: user };
};

export const registerFailure = (error) => {
    return { type: REGISTER_FAILURE, payload: error };
};

export const fetchUserDataSuccess = (user) => {
    return { type: FETCH_USERDATA_SUCCESS, payload: user };
};

export const fetchUserDataFailure = (error) => {
    return { type: FETCH_USERDATA_FAILURE, payload: error };
};

export const logout = () => {
    return (dispatch) => {
        // Clear the user cookie when logging out
        Cookies.remove('userCookie');
    
        // Dispatch the logout action
        dispatch({ type: LOGOUT });
    };
};

export const buyPokemonSuccess = (updateCash) => {
    return { type: BUY_POKEMON_SUCCESS, payload: updateCash };
};

// export const buyPokemonFailure = (error) => {
//     return { type: BUY_POKEMON_FAILURE, payload: error };
// };
export const buyPokemonFailure = (error) => {
    // Extract relevant information from the AxiosError object
    const errorMessage = error.message || 'An error occurred';
  
    return { type: BUY_POKEMON_FAILURE, payload: errorMessage };
};
  

// login action
export const login = (credentials) => {
  return async (dispatch) => {
    try {
        // Make an API request to your login endpoint on the server
        console.log(credentials);
        const response = await axios.post('http://localhost:3000/login', credentials);

        // Assuming the server returns a user object upon successful login
        const user = response.data;
        console.log(response.status);
        console.log(user);

        // Dispatch the success action and store user data in the state
        Cookies.set('userCookie', JSON.stringify(user), { expires: 7 });
        dispatch(loginSuccess(user));
    } catch (error) {
        console.log(error);
        dispatch(loginFailure(error));
    }
  };
};

// registration action
export const register = (userData) => {
    return async (dispatch) => {
        try {
            // Make an API request to your registration endpoint on the server
            const response = await axios.post('http://localhost:3000/register', userData);

            // Assuming the server returns a user object upon successful registration
            const user = response.data;
            console.log(response.status);
            console.log(user);
            // Dispatch the success action and store user data in the state
            Cookies.set('userCookie', JSON.stringify(user), { expires: 7 });
            dispatch(registerSuccess(user));
        } catch (error) {
            console.log(error);
            dispatch(registerFailure(error));
        }
    };
};

export const fetchUserData = (userid) => {
    return async (dispatch) => {
      try {
          // Make an API request to your login endpoint on the server
          const response = await axios.post('http://localhost:3000/fetchUserData', {userid: userid});
  
          // Assuming the server returns a user object upon successful login
          const user = response.data;
          console.log(response.status);
          console.log(user);
  
          // Dispatch the success action and store user data in the state
          Cookies.set('userCookie', JSON.stringify(user), { expires: 7 });
          dispatch(fetchUserDataSuccess(user));
      } catch (error) {
          console.log(error);
          dispatch(fetchUserDataFailure(error));
      }
    };
  };

// buyPokemon action
export const buyPokemon = (pokemonID, userID) => {
    return async (dispatch) => {
      try {
          // Make an API request to your login endpoint on the server
          const response = await axios.post(`http://localhost:3000/buyPokemon`, { pokemonid: pokemonID, userid: userID });

          // Assuming the server returns a user object upon successful login
          const updateCash = response.data;
          console.log(response.status);
          console.log(updateCash);

          dispatch(buyPokemonSuccess(updateCash));
      } catch (error) {
          console.log(error);
          dispatch(buyPokemonFailure(error));
      }
    };
};

