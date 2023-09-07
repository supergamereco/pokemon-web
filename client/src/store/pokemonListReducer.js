import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    pokemons: []
}

const pokemonSlice = createSlice({
    name: "pokemonListing",
    initialState,
    reducers:{
        addPokemon: (state, action) => {
            state.pokemons = action.payload
            console.log(current(state));
        }
    }
});

export const {addPokemon} = pokemonSlice.actions;
export default pokemonSlice.reducer;
