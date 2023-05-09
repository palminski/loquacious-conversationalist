import Auth from "../utils/auth";
import {useState} from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Nav = (props) => {


    const {pathname: location} = useLocation();
    console.log(location)

    const {pageSelected, setPageSelected} = props;
    const [coverOn, setCoverOn] = useState(false);

    const changePage = (newPage) => {
        
        setCoverOn(true);

        setTimeout(()=> {
            setCoverOn(false);
            setPageSelected(newPage);
        }, 550)
    }


    return (
        <nav>
            <div className="flex-container top-bar">
                <h1 className="home-button">LC</h1>
                <h1 className="current-page grow-in">Loquacious Cards</h1>
            </div>


            <ul>
                <Link to='/'>
                    <li className={`${(location === '/') && 'current-navigation-link'} navigation-link`}>
                        Home
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
                        <Link to="/" onClick={() => { Auth.logout() }}>
                            <li className='navigation-link'>
                                Logout
                            </li>
                        </Link>
                    </>
                    
                }
            </ul>
            {coverOn && <>
                <div className='white-cover slide-in-left'></div>
                <div className='white-cover slide-in-right'></div>
            </>}
        </nav>
    )
}

export default Nav;