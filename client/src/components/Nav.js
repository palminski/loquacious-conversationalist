import Auth from "../utils/auth";
import {useState} from 'react';

const Nav = (props) => {
    const {pageSelected, setPageSelected} = props;
    const [coverOn, setCoverOn] = useState(false);

    const changePage = (newPage) => {
        console.log("hello")
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
                <h1 className="current-page grow-in">{pageSelected}</h1>
            </div>


            <ul>
                <a href='#Home' onClick={() => changePage('Home')}>
                    <li className={`${(pageSelected === 'Home') && 'current-navigation-link'} navigation-link`}>
                        Home
                    </li>
                </a>
                {!Auth.loggedIn() &&
                    <a href='#LogIn' onClick={() => changePage('Log In')}>
                        <li className={`${(pageSelected === 'Log In') && 'current-navigation-link'} navigation-link`}>
                            Log In
                        </li>
                    </a>
                }
                {!Auth.loggedIn() &&
                    <a href='#SignUp' onClick={() => changePage('Sign Up')}>
                        <li className={`${(pageSelected === 'Sign Up') && 'current-navigation-link'} navigation-link`}>
                            Sign Up
                        </li>
                    </a>
                }
                {Auth.loggedIn() &&
                    <>
                        
                        <a href="#Decks"onClick={() => changePage('Decks')}>
                            <li className={`${(pageSelected === 'Decks') && 'current-navigation-link'} navigation-link`}>
                                Decks
                            </li>
                        </a>
                        <a href="#Cards"onClick={() => changePage('Cards')}>
                            <li className={`${(pageSelected === 'Cards') && 'current-navigation-link'} navigation-link`}>
                                Cards
                            </li>
                        </a>
                        <a href="#Review"onClick={() => changePage('Review')}>
                            <li className={`${(pageSelected === 'Review') && 'current-navigation-link'} navigation-link`}>
                                Review
                            </li>
                        </a>
                        <a href='/' onClick={() => { Auth.logout() }}>
                            <li className='navigation-link'>
                                Logout
                            </li>
                        </a>
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