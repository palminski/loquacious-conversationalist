import Auth from "../utils/auth";
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectDeck } from '../utils/slices/deckSlice';

const Nav = (props) => {

    const deck = useSelector(selectDeck);

    const {pathname: location} = useLocation();








    return (
        <nav>
            <div className="flex-container top-bar">
            <Link to='/' style={{textDecoration: "none"}}>
                <h1 className="title grow-in">Loquacious Cards</h1>
                </Link>
            </div>


            <ul>
                <Link to='about'>
                    <li className={`${(location === '/about') && 'current-navigation-link'} navigation-link`}>
                        About
                    </li>
                </Link>
                {!Auth.loggedIn() &&
                    <Link to='login'>
                        <li className={`${(location === '/login') && 'current-navigation-link'} navigation-link`}>
                            Log In
                        </li>
                    </Link>
                }
                {!Auth.loggedIn() &&
                    <Link to='signup'>
                        <li className={`${(location === '/signup') && 'current-navigation-link'} navigation-link`}>
                            Sign Up
                        </li>
                    </Link>
                }
                {Auth.loggedIn() &&
                    <>
                        
                        <Link to='decks'>
                            <li className={`${(location === '/decks') && 'current-navigation-link'} navigation-link`}>
                                Decks
                            </li>
                        </Link>
                        {deck.title && 
                        <>
                            <Link to='cards'>
                            <li className={`${(location === '/cards') && 'current-navigation-link'} navigation-link`}>
                                Cards
                            </li>
                        </Link>
                        <Link to='review'>
                            <li className={`${(location === '/review') && 'current-navigation-link'} navigation-link`}>
                                Review
                            </li>
                        </Link>
                        </>}
                        
                        <Link to="/" onClick={() => { Auth.logout() }}>
                            <li className='navigation-link'>
                                Logout
                            </li>
                        </Link>
                    </>
                    
                }
            </ul>
            
        </nav>
    )
}

export default Nav;