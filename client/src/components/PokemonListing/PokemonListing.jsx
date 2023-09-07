import React from 'react'
import './PokemonListing.scss'
import { useSelector } from 'react-redux'
import PokemonCard from '../PokemonCard/PokemonCard'

function PokemonListing() {

    const { pokemons } = useSelector((state) => state.pokemons)

  return (
    <div className='pokemon-container'>
        {pokemons && pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon}/>
        ))}
    </div>
  )
}

export default PokemonListing