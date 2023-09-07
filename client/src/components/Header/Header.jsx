import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import './Header.scss'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../action/authAction';

function Header() {
    const dispatch = useDispatch();
    const [username, setUsername] = useState(null);
    const [cash, setCash] = useState(null);
    useEffect(() => {
        // Check if user data is stored in a cookie
        const userCookie = Cookies.get('userCookie');
    
        if (userCookie) {
          // Parse the user data from the cookie
          const userData = JSON.parse(userCookie);
          
          // Set the username from the parsed user data
          setUsername(userData.username);
          setCash(userData.cash);
        }
    }, []);

    const user = useSelector(state => state.userdata.user);
    const formattedCash = cash !== null ? formatAsInteger(`${cash.toFixed(2)}`) : null;
    function formatAsInteger(amount) {
        return Math.floor(amount).toLocaleString();
    }

    const handleHomeLinkClick = () => {
        // Reload the current page
        //window.location.reload();
    };

    const handleLoginLinkClick = () => {
        // Reload the current page
        window.location.reload();
    };

    const handleRegisterLinkClick = () => {
        // Reload the current page
        window.location.reload();
    };

    const handleUserPokemonLinkClick = () => {
        // Reload the current page
        //window.location.reload();
    };

    const handleLogout = async () => {
        dispatch(logout());
    };

  return (
    <nav>
        <div className='container'>
            <ul className='nav-wrapper'>
                <li ><Link to="/pokemon" onClick={handleHomeLinkClick}>Home</Link></li>
                <li ><Link to="/">About</Link></li>
                <li ><Link to="/">Contact</Link></li>
                
                {username || user ? ( <li className="username"><Link to="/userspokemon" onClick={handleUserPokemonLinkClick}>Welcome, {username || user.username}</Link> 
                    {formattedCash !== null && <span className='cash'>Cash: ${formattedCash}</span>}
                    {username || user ? (<button className='logout-btn' onClick={handleLogout}>Logout</button>) : null}</li>
                    ) : (
                    <>
                        <li><Link to="/login" onClick={handleLoginLinkClick}>Login</Link></li>
                        <li><Link to="/register" onClick={handleRegisterLinkClick}>Register</Link></li>
                    </>
                )}
            </ul>
        </div>
    </nav>
  )
}

export default Header
