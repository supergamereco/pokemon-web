import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import PokemonApi from '../../router/pokemonApi'
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom'
import { buyPokemon, fetchUserData } from '../../action/authAction';
import './PokemonDetail.scss'

function PokemonDetail() {

    const dispatch = useDispatch();
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    console.log(id);

    useEffect(() => {
        const fetchDetail = async () => {
            const res = await PokemonApi.get(`${id}`)
                        .catch((error) => {
                            console.error("Error ", error);
                        });
            setPokemon(res.data);
            setLoading(true);
        }
        fetchDetail();
    }, []);

    const [userid, setUserid] = useState(null);
    useEffect(() => {
        // Check if user data is stored in a cookie
        const userCookie = Cookies.get('userCookie');
    
        if (userCookie) {
          // Parse the user data from the cookie
          const userData = JSON.parse(userCookie);
          
          // Set the username from the parsed user data
          setUserid(userData.userid);
        }
    }, []);

    const handleBuyPokemon = async () => {
        await dispatch(buyPokemon(id, userid));
        await dispatch(fetchUserData(userid));
        //window.location.reload();
    };
    
  return (
    <div>
        {loading ? (
            <div className='pokemon-detail-con'>
                <div className='pokemon-detail-img'>
                    <img src={pokemon.sprite} alt={pokemon.name} width={180} height={180}/>
                </div>
                <div className='pokemon-detail-info'>
                    <div className='pokemon-detail-infotext'>
                        <p className='pokemon-detail-name'>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                        <p className='pokemon-detail-number'>Pokedex No. {pokemon.id}</p>
                        <p className={`pokemon-detail-type type-${pokemon.type1_id}`} style={{margin: "2rem 0"}}>{pokemon.type1_id}</p>
                        <p className={`pokemon-detail-type type-${pokemon.type2_id}`} style={{margin: "2rem 0"}}>{pokemon.type2_id}</p>
                    </div>
                    <button className='add-pokemon-action' onClick={handleBuyPokemon}>Buy Pokemon</button>
                    <div className='pokemon-detail-table'>
                        <h3 className='table-header'>Pokemon Stats</h3>
                        <table>
                            <tbody>
                                <tr>
                                    <td>HP</td>
                                    <td>{pokemon.baseHP}</td>
                                </tr>
                                <tr>
                                    <td>Attack</td>
                                    <td>{pokemon.baseAttack}</td>
                                </tr>
                                <tr>
                                    <td>Defense</td>
                                    <td>{pokemon.baseDefense}</td>
                                </tr>
                                <tr>
                                    <td>S.Attack</td>
                                    <td>{pokemon.baseSAttack}</td>
                                </tr>
                                <tr>
                                    <td>S.Defense</td>
                                    <td>{pokemon.baseSDefense}</td>
                                </tr>
                                <tr>
                                    <td>Speed</td>
                                    <td>{pokemon.baseSpeed}</td>
                                </tr>
                                <tr>
                                    <td>Price</td>
                                    <td>{pokemon.price}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        ) : (
            <h4 style={{margin:"1rem 0"}}>Loading...</h4>
        )}
    </div>
  )
}

export default PokemonDetail