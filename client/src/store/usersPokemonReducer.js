import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    pokemons: []
}

const usersPokemonSlice = createSlice({
    name: "usersPokemonListing",
    initialState,
    reducers:{
        addPokemon: (state, action) => {
            state.pokemons = action.payload
            console.log(current(state));
        }
    }
});

export const {addPokemon} = usersPokemonSlice.actions;
export default usersPokemonSlice.reducer;
