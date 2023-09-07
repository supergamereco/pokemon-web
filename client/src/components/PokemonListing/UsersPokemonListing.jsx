import React from 'react'
import './PokemonListing.scss'
import { useSelector } from 'react-redux'
import UsersPokemonCard from '../PokemonCard/UsersPokemonCard'

function UsersPokemonListing() {

    const { pokemons } = useSelector((state) => state.pokemons)

  return (
    <div className='user-pokemon-container'>
        {pokemons && pokemons.map((pokemon) => (
            <UsersPokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
    </div>
  )
}

export default UsersPokemonListing