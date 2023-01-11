import { useQuery, useMutation } from "@apollo/client";
import {QUERY_ALL_USERS, QUERY_CURRENT_USER} from "../utils/queries"
import { DELETE_DECK } from "../utils/mutations";
import {useState} from 'react';

import AddDeckModal from '../components/AddDeckModal';

const Decks = () => {
    
    //===[States]=============================================   
    const [modalOpen, setModalOpen] = useState(false);

    //===[Queries]=============================================   
    const {loading, data, refetch} = useQuery(QUERY_CURRENT_USER);
    const decks = (data?.currentUser.decks)
    console.log(data);

    //===[Mutations]=============================================   
    const [deleteDeck] = useMutation(DELETE_DECK);

    //===[Functions]=============================================
    async function handleDeleteDeck(deckId) {
        try {
            await deleteDeck({
                variables: {
                    deckId: deckId
                }
            });
            refetch();
        }
        catch (error) {
            console.log(error)
        }
    }

    const toggleModal = () => {
        if (document.body.style.overflow !== 'hidden') {
            document.body.style.overflow = "hidden";
            document.body.style.height = "100%";
        }
        else
        {
            document.body.style.overflow = "auto";
            document.body.style.height = "auto";
        };
        setModalOpen(!modalOpen);
    }

    return (
        <>
            <div className="container">

                <ul className="deck-list">
                    <h2>My Decks</h2>
                    {decks && decks.map(deck => (
                        <li key={deck._id}>
                            <div className="flex-between">
                                <h3>{deck.title} {deck.description && ` - ${deck.description}`}</h3>
                                <div className="hidden-buttons">
                                    <button className="delete-button" onClick={() => handleDeleteDeck(deck._id)}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}

                </ul>
                <button className="add-button" onClick={toggleModal}>Add Deck</button>
        </div>
        
            {modalOpen && <AddDeckModal/>}
        </>
        
    )
}

export default Decks;