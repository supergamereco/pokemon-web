import React, {useState, useEffect} from 'react'
import pokemonApi from '../../router/pokemonApi'
import { useDispatch } from 'react-redux'
import { addPokemon } from '../../store/pokemonListReducer'
import PokemonListing from '../PokemonListing/PokemonListing'
import './Home.scss'

function Home() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    useEffect(() => {
        const fetchPokemons = async () =>{
            const res = await pokemonApi.get();
        
            setTimeout(() => {
                dispatch(addPokemon(res.data));
            }, 500)
        }

        fetchPokemons();
    }, []);
  return (
    <div>
        <h3 style={{margin:"1rem 0"}}>Pokedex</h3>
        <input type='text' placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <PokemonListing />
    </div>
  )
}

export default Home