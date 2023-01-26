import { useQuery } from "@apollo/client";
import {QUERY_ALL_USERS, QUERY_CURRENT_USER} from "../utils/queries"

const Home = () => {
    const {data:me} = useQuery(QUERY_CURRENT_USER);
    const {loading, data} = useQuery(QUERY_ALL_USERS);
    const users = (data?.users)
    const currentUser = me?.currentUser;

    return (
        <div className="grow-in"> 
            <div className="container">
            <div className="welcome-card">
                    <h2>Welcome to Loquacious Cards!</h2>
                    <p>Loquacious Cards is a free online flashcard app where users can create decks, add cards to them, and review them. To get started simply log-in or sign-up and create a deck. Once you have a created and selected your deck you can add, delete, and edit cards to your heart's content! This page will give you a rundown on how to use each section of this website.</p>
                </div>
                <div className="welcome-card tutorial">
                    <h2>Decks</h2>
                    <p>This page is used to add new decks to your account as well as select the deck you want to review or edit. To add a new deck use the button at the bottom of the list of decks. To select a deck to make your active deck click on its name on the list.<br/>Decks must have a title but are not required to have a description.</p>
                </div>
                <div className="welcome-card tutorial">
                    <h2>Cards</h2>
                    <p>This page is used to edit the contents of your selected deck. Cards can be added using the form at the top of the page. To edit a card in the deck select it from the card list and change its values on the form.<br/>Cards must have a title on both sides, but descriptions are not required.</p>
                </div>
                <div className="welcome-card tutorial">
                    <h2>Review</h2>
                    <p>This page is used to review cards in the selected deck. Upon clicking this link your deck will be shuffled and cards will appear on the page one at a time. You will be able to flip the card and/or reveal the description(assuming the card has one). Below these two options you can select weather you got the card correct, or incorrect. Upon making a selection the card will be removed from the review session or moved to the back of the deck. Once all cards have been marked correct you will be given the option to reshuffle the deck and review again. Leaving this page mid way through a review will also reshuffle the deck.</p>
                </div>

                
            </div>
        
            
        </div>
    )
}

export default Home;