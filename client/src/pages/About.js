import { useQuery } from "@apollo/client";
import {QUERY_ALL_USERS, QUERY_CURRENT_USER} from "../utils/queries"

const About = () => {
    const {data:me} = useQuery(QUERY_CURRENT_USER);
    const {loading, data} = useQuery(QUERY_ALL_USERS);
    const users = (data?.users)
    const currentUser = me?.currentUser;

    return (
        <div className="grow-in"> 
            <div className="container">
            <div className="welcome-card">
                    <h2>Welcome to Loquacious Cards!</h2>
                    <p style={{fontSize: "large"}}>Loquacious Cards is a free online flashcard app where users can create decks, review them, and share them with others. To get started simply log-in or sign-up and create a deck! Alternatively, if you already have a link to a deck you would like to review, enter it into the search bar in your browser and begin reviewing immediately, no account required!</p>
                </div>
                <div className="welcome-card tutorial">
                    <h2>Decks</h2>
                    <p>This page is used to add new decks to your account as well as select the deck you want to review or edit. To add a new deck use the button at the bottom of the list of decks. To select a deck to make your active deck click on its name on the list. Doing so will bring you to the cards page where you can add, edit, and delete cards.</p>
                </div>
                <div className="welcome-card tutorial">
                    <h2>Cards</h2>
                    <p>This page is used to edit the contents of your selected deck.Cards can be added using the form at the top of the page. To edit a card in the deck select it from the card list which will change the add card form into an edit form. This page can also be used to edit the title and description of your selected deck.<br/>Cards must have a title on both sides, but descriptions are not required.
                    <br></br>This page also has a button at the bottom to copy a link that when entered into a browser will direct you to a page where the deck can be reviewed. This link can be given to other people to allow them to review or copy your deck. There is also a QR code on the page that when scanned will also direct to the review page.
                    </p>
                </div>
                <div className="welcome-card tutorial">
                    <h2>Review</h2>
                    <p>This page is used to review cards in the selected deck. Upon clicking this link your deck will be shuffled and cards will appear on the page one at a time. You will be able to flip the card and/or reveal the description(assuming the card has one). Below these two options you can select whether you got the card correct, or incorrect. Upon making a selection the card will be removed from the review session or moved to the back of the deck. Once all cards have been marked correct you will be given the option to reshuffle the deck and review again. Leaving this page midway through a review will also reshuffle the deck.
                        <br></br>If you are logged into an account and reviewing a deck made by someone else you will be able to make a copy of it. This copy will act like any other deck you may have created and cards can be added, edited, and deleted like any other deck.
                    </p>
                </div>

                
            </div>
        
            <br/>
        </div>
    )
}

export default About;