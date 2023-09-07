import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from './pokemonListReducer';
import userData from './authReducer';

export default configureStore({
    reducer:{
        pokemons: pokemonSlice,
        userdata: userData
    }
});
