import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { ADD_CARD, EDIT_CARD, DELETE_CARD } from '../utils/mutations';
import { QUERY_CURRENT_USER } from '../utils/queries';
import { setDeck, updateCards, selectDeck } from '../utils/slices/deckSlice';
import { QRCodeSVG } from 'qrcode.react';

import QRCodeModal from '../components/QRCodeModal';

const sharedDeckURL = `http://localhost:3000/review-shared/`

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

   const [modalOpen,setModalOpen] = useState(false);

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
                    },
                    optimisticResponse: {
                        addCard: {
                            _id: -1,
                        __typename: 'Card',
                        sideATitle: "test",
                        sideBTitle: formState.sideBTitle,
                        sideADescription: formState.sideADescription,
                        sideBDescription: formState.sideBDescription
                        }
                    }
                });
                setFormState({ sideATitle: '', sideADescription: '', sideBTitle: '', sideBDescription: '' });
                refetch();
                setSelectedCard(null);
                const newCard = mutationResponse.data.addCard;
                const updatedCardArray = [...deck.cards,newCard];
                
                dispatch(updateCards(updatedCardArray));
                
            }
            else {
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
                
                const newCard = mutationResponse.data.editCard;
                const updatedCardArray = [...deck.cards];
                updatedCardArray[updatedCardArray.findIndex((card) => card._id === newCard._id)] = newCard;

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


            const deletedCard = mutationResponse.data.deleteCard;
            const updatedCardArray = [...deck.cards];

            let index = updatedCardArray.findIndex((card) => card._id === deletedCard._id)
            if (index !== -1) updatedCardArray.splice(index,1);

            dispatch(updateCards(updatedCardArray));
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

            { deck.title ? 
                <>
                    <div className='container'>
                        <div className='new-card-form'>
                            <h2 className='white'>{selectedCard ? "Edit card for " : "Add card to "}{deck.title}</h2>
                            {deck.description && <h3 className='description white'>{deck.description}</h3>}

                            <form>
                                <div className='flex-left edit-card'>
                                    <div className='side-form side-a'>
                                        <h2>Front</h2>
                                        <label htmlFor="sideATitle">Side A Title</label>
                                        <input required={true} type="text" id="sideATitle" name="sideATitle"  onChange={handleFormChange} value={formState.sideATitle}></input>
                                        <br />
                                        <label htmlFor="sideADescription">Side A Description</label>
                                        <br />
                                        <textarea rows={7} required={true} type="text" id="sideADescription" name="sideADescription"  onChange={handleFormChange} value={formState.sideADescription}></textarea>
                                    </div>
                                    <div className='side-form side-b'>
                                        <h2>Back</h2>
                                        <label htmlFor="sideBTitle">Side B Title</label>
                                        <input required={true} type="text" id="sideBTitle" name="sideBTitle"  onChange={handleFormChange} value={formState.sideBTitle}></input>
                                        <br />
                                        <label htmlFor="sideBDescription">Side B Description</label>
                                        <br />
                                        <textarea rows={7} required={true} type="text" id="sideBDescription" name="sideBDescription"  onChange={handleFormChange} value={formState.sideBDescription}></textarea>
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
                                <h2>Cards in {deck.title}</h2>
                                {deck.cards.map(card => (
                                    <li onClick={() => { setSelectedCard(card); setFormState({ sideATitle: card.sideATitle, sideADescription: card.sideADescription, sideBTitle: card.sideBTitle, sideBDescription: card.sideBDescription }); }} key={card._id} className={`${(selectedCard?._id === card._id) && "selected-card"}`}>

                                        <h3>{card.sideATitle} - {card.sideBTitle} </h3>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                    <h2><button onClick={() => {navigator.clipboard.writeText(sharedDeckURL+deck._id)}}>Copy Shareable Link to CLipboard</button></h2>
                    
                    <QRCodeSVG value={sharedDeckURL+deck._id} onClick={toggleModal} style={{cursor: 'zoom-in'}} imageSettings={{excavate: false}}/>
                    {/* This is where QR code iwll go for now */}
                    {modalOpen && <QRCodeModal toggleModal={toggleModal}  link={sharedDeckURL+deck._id}/>}
                </>
                :
                        <div className='container'>
                            <div className='no-deck-warning'>
                                <h1>No Deck Selected</h1>
                                <hr></hr>
                                <h2>Please select a deck to either review or add cards to.</h2>
                            </div>

                        </div>
                
            }





        </div>

    );

}

export default Cards;