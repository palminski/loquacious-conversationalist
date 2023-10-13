import Auth from "../utils/auth";

const Home = () => {


    return (
        <div className="grow-in">
            <div className="container slow-pulse">
                <div className="hero">
                    <h1>Loquacious Cards</h1>
                    <hr></hr>
                    <br></br>
                    <h2>The Simple and Free Flashcard Solution</h2>
                </div>
                
                {Auth.loggedIn() ?
                    <div className="mini-hero">
                        <h2>Use Links above to get started!</h2>
                    </div>
                    :
                    <div className="mini-hero">
                        <h2>Sign Up Free Today!</h2>
                    </div>}

            </div>
            <br />
        </div>
    )
}

export default Home;