import React, {useState, useEffect} from 'react'
import userPokemonApi from '../../router/userPokemonApi'
import { useDispatch } from 'react-redux'
import { addPokemon } from '../../store/usersPokemonReducer'
import UsersPokemonListing from '../PokemonListing/UsersPokemonListing'
import './UsersPokemon.scss'

function UsersPokemon() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    useEffect(() => {
        const fetchPokemons = async () =>{
            const res = await userPokemonApi.get();
        
            setTimeout(() => {
                dispatch(addPokemon(res.data));
            }, 500)
        }

        fetchPokemons();
    }, []);
  return (
    <div>
        <h3 style={{margin:"1rem 0"}}>Pokemons</h3>
        <input type='text' placeholder='Search...' value={search} onChange={(e) => setSearch(e.target.value)}/>
        <UsersPokemonListing />
    </div>
  )
}

export default UsersPokemon