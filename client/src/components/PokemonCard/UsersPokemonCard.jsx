import React from 'react'
import './PokemonCard.scss'
import { Link } from 'react-router-dom'

function UsersPokemonCard({pokemon}) {
  return (
    <div className='card'>
        <div className='frame'>
            <p className='card-number'>No. {pokemon.id}</p>
            <div className='card-image'>
                <img src={pokemon.sprite} alt={pokemon.name} />
            </div>
            <div className='card-content'>
                <span className='card-title'>{pokemon.card}</span>
                <p className='card-name'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                <p className={`card-type type-${pokemon.type1_id}`}> {pokemon.type1_id}</p>
                <p className={`card-type type-${pokemon.type2_id}`}> {pokemon.type2_id}</p>
            </div>
            <div className='card-action'>
                <Link to={`${pokemon.id}`}>More Detail</Link>
            </div>
        </div>
    </div>
  )
}

export default UsersPokemonCard