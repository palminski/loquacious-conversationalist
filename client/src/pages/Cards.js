import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ADD_CARD, EDIT_CARD, DELETE_CARD } from '../utils/mutations';
import { QUERY_CURRENT_USER } from '../utils/queries';
import { setDeck, updateCards, selectDeck } from '../utils/slices/deckSlice';

const Cards = () => {
    //===[Redux]==============================================
    const dispatch = useDispatch();
    const deck = useSelector(selectDeck);

    //===[Queries]============================================
    const { refetch } = useQuery(QUERY_CURRENT_USER);

    //===[Mutations]==========================================
    const [addCard] = useMutation(ADD_CARD);
    const [editCard] = useMutation(EDIT_CARD);
    const [deleteCard] = useMutation(DELETE_CARD);

    //===[States]=============================================
    const [formState, setFormState] = useState({ sideATitle: '', sideADescription: '', sideBTitle: '', sideBDescription: '' });

    const [selectedCard, setSelectedCard] = useState(null)


    //===[Functions]==========================================
    function handleFormChange(e) {
        setFormState({ ...formState, [e.target.name]: e.target.value });
    }
    async function handleFormSubmit(e) {
        e.preventDefault()
        try {

            if (!selectedCard) {
                const mutationResponse = await addCard({
                    variables: {
                        deckId: deck._id,
                        sideATitle: formState.sideATitle,
                        sideBTitle: formState.sideBTitle,
                        sideADescription: formState.sideADescription,
                        sideBDescription: formState.sideBDescription
                    }
                });
                setFormState({ sideATitle: '', sideADescription: '', sideBTitle: '', sideBDescription: '' });
                refetch();
                setSelectedCard(null);
                const updatedCardArray = (mutationResponse.data.addCard.decks.find(x => x._id === deck._id));
                dispatch(updateCards(updatedCardArray));
            }
            else {
                console.log("adding card");
                const mutationResponse = await editCard({
                    variables: {
                        deckId: deck._id,
                        cardId: selectedCard._id,
                        sideATitle: formState.sideATitle,
                        sideBTitle: formState.sideBTitle,
                        sideADescription: formState.sideADescription,
                        sideBDescription: formState.sideBDescription
                    }
                });
                setFormState({ sideATitle: '', sideADescription: '', sideBTitle: '', sideBDescription: '' });
                refetch();
                setSelectedCard(null);
                const updatedCardArray = (mutationResponse.data.editCard.decks.find(x => x._id === deck._id));
                dispatch(updateCards(updatedCardArray));
            }


        }
        catch (error) {
            console.log(error)
        }
    }
    async function handleDeleteCard(e) {
        e.preventDefault();
        try {
            const mutationResponse = await deleteCard({
                variables: {
                    deckId: deck._id,
                    cardId: selectedCard._id,
                }
            });

            refetch();
            setFormState({ sideATitle: '', sideADescription: '', sideBTitle: '', sideBDescription: '' });
            setSelectedCard(null);
            const updatedCardArray = (mutationResponse.data.deleteCard.decks.find(x => x._id === deck._id));
            dispatch(updateCards(updatedCardArray));
        }
        catch (error) {
            console.log(error)
        }
    }

    //===[RETURN JSX]===============================================================================

    return (
        <div className="grow-in">

            { deck.title ? 
                <>
                    <div className='container'>
                        <div className='new-card-form'>
                            <h2>{deck.title}</h2>
                            {deck.description && <h3 className='description'>{deck.description}</h3>}

                            <form>
                                <div className='flex-left edit-card'>
                                    <div className='side-form side-a'>
                                        <h2>Front</h2>
                                        <label htmlFor="sideATitle">Side A Title</label>
                                        <input required={true} type="text" id="sideATitle" name="sideATitle" placeholder="Title for Side A" onChange={handleFormChange} value={formState.sideATitle}></input>
                                        <br />
                                        <label htmlFor="sideADescription">Side A Description</label>
                                        <br />
                                        <textarea rows={7} required={true} type="text" id="sideADescription" name="sideADescription" placeholder="Title for Side A" onChange={handleFormChange} value={formState.sideADescription}></textarea>
                                    </div>
                                    <div className='side-form side-b'>
                                        <h2>Back</h2>
                                        <label htmlFor="sideBTitle">Side B Title</label>
                                        <input required={true} type="text" id="sideBTitle" name="sideBTitle" placeholder="Title for Side A" onChange={handleFormChange} value={formState.sideBTitle}></input>
                                        <br />
                                        <label htmlFor="sideBDescription">Side B Description</label>
                                        <br />
                                        <textarea rows={7} required={true} type="text" id="sideBDescription" name="sideBDescription" placeholder="Title for Side A" onChange={handleFormChange} value={formState.sideBDescription}></textarea>
                                    </div>
                                </div>
                                <button className='add-card-button' onClick={handleFormSubmit}>{selectedCard ? "Save Card" : "Add Card"}</button>
                                {selectedCard && <button className='add-card-button' onClick={handleDeleteCard}>Delete Card</button>}
                            </form>


                        </div>
                    </div>

                    <div className='container '>
                        {(deck.cards.length > 0) &&
                            <ul className='card-list'>

                                {deck.cards.map(card => (
                                    <li onClick={() => { setSelectedCard(card); setFormState({ sideATitle: card.sideATitle, sideADescription: card.sideADescription, sideBTitle: card.sideBTitle, sideBDescription: card.sideBDescription }); }} key={card._id} className={`${(selectedCard?._id === card._id) && "selected-card"}`}>

                                        <h3>{card.sideATitle} - {card.sideBTitle} </h3>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                </>
                :

                <>
                <h1>No deck Selected</h1>
                </>
            }





        </div>

    );

}

export default Cards;