import { useQuery } from "@apollo/client";
import {QUERY_ALL_USERS, QUERY_CURRENT_USER} from "../utils/queries"

import {useState} from 'react';

import AddDeckModal from '../components/AddDeckModal';

const Decks = () => {
    const {loading, data} = useQuery(QUERY_CURRENT_USER);
    const decks = (data?.currentUser.decks)
    console.log(decks);
    const [modalOpen, setModalOpen] = useState(false);

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
            <button onClick={toggleModal}>Add Deck</button>
            <h2>My Decks</h2>
            <ul>
                {decks && decks.map(deck => (
                    <li key={deck._id}>{deck.title}</li>
                ))}
            </ul>

            {modalOpen && <AddDeckModal/>}
        </>
    )
}

export default Decks;