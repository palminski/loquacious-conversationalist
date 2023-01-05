import Auth from "../utils/auth";

const Nav = (props) => {
    const {pageSelected, setPageSelected} = props;

    return (
        <nav>
            <div className="flex-container top-bar">
                <h1 className="home-button">LC</h1>
                <h1 className="current-page grow-in">{pageSelected}</h1>
            </div>


            <ul>
                <a href='#Home' onClick={() => setPageSelected('Home')}>
                    <li className={`${(pageSelected === 'Home') && 'current-navigation-link'} navigation-link`}>
                        Home
                    </li>
                </a>
                {!Auth.loggedIn() &&
                    <a href='#LogIn' onClick={() => setPageSelected('Log In')}>
                        <li className={`${(pageSelected === 'Log In') && 'current-navigation-link'} navigation-link`}>
                            Log In
                        </li>
                    </a>
                }
                {!Auth.loggedIn() &&
                    <a href='#SignUp' onClick={() => setPageSelected('Sign Up')}>
                        <li className={`${(pageSelected === 'Sign Up') && 'current-navigation-link'} navigation-link`}>
                            Sign Up
                        </li>
                    </a>
                }
                {Auth.loggedIn() &&
                    <a href='/' onClick={() => { Auth.logout()}}>
                        <li className='navigation-link'>
                            Logout
                        </li>
                    </a>
                }
            </ul>
        </nav>
    )
}

export default Nav;