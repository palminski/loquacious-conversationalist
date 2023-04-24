import { useQuery, useMutation } from "@apollo/client";
import {QUERY_ALL_USERS, QUERY_CURRENT_USER} from "../utils/queries"
import { DELETE_DECK } from "../utils/mutations";
import {useState} from 'react';

import { useNavigate } from "react-router-dom";

import {useSelector,useDispatch} from 'react-redux';
import {
    setDeck, selectDeck
} from '../utils/slices/deckSlice'

import AddDeckModal from '../components/AddDeckModal';

const Decks = () => {
    //===[Redux]==============================================
    const dispatch = useDispatch();
    const currentDeck = useSelector(selectDeck)
    const currentDeckId = currentDeck._id;

    //===[Router]=============================================
    const navigate = useNavigate();
    
    //===[States]=============================================   
    const [modalOpen, setModalOpen] = useState(false);

    //===[Queries]=============================================   
    const {loading, data, refetch} = useQuery(QUERY_CURRENT_USER);
    const decks = (data?.currentUser.decks)
    
    

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
            if (deckId === currentDeck._id) {
                console.log("deleted active deck");
                dispatch(setDeck({
                    cards: []
                }))
            }
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

    
    
    //===[RETURN JSX]===============================================================================
    
    return (
        <div className="grow-in"> 
            <div className="container">

                <ul className="deck-list">
                    <h2>My Decks</h2>
                    {decks && decks.map(deck => (
                        <li className={`${(currentDeckId === deck._id) && "selected-deck"}`} key={deck._id} onClick={() => {dispatch(setDeck(deck)); navigate('../cards')}}>
                            <div className="flex-between">
                                <h3>{deck.title} {(deck.description) && ` - ${deck.description}`}</h3>
                                <div className="hidden-buttons">
                                    <button className="delete-button" onClick={(e) => {e.stopPropagation();handleDeleteDeck(deck._id)}}>Delete</button>
                                </div>
                            </div>
                        </li>
                    ))}

                </ul>
                <button className="bottom-button-extend" onClick={toggleModal}>Add Deck</button>
        </div>
        
            {modalOpen && <AddDeckModal toggleModal={toggleModal}/>}
        </div>
        
    )
}

export default Decks;