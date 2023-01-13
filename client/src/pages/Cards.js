import {useSelector, useDispatch} from 'react-redux';
import {useMutation, useQuery} from '@apollo/client';
import {useState} from 'react';
import { ADD_CARD, DELETE_CARD } from '../utils/mutations';
import { QUERY_CURRENT_USER } from '../utils/queries';
import {setDeck, updateCards, selectDeck} from '../utils/slices/deckSlice';

const Cards = () => {
    //===[Redux]==============================================
    const dispatch = useDispatch();
    const deck = useSelector(selectDeck);

    //===[Queries]============================================
    const {refetch} = useQuery(QUERY_CURRENT_USER);

    //===[Mutations]==========================================
    const [addCard] = useMutation(ADD_CARD);
    const [deleteCard] = useMutation(DELETE_CARD);

    //===[States]=============================================
    const [formState, setFormState] = useState({sideATitle:'',sideADescription:'',sideBTitle:'',sideBDescription:''});

    const [selectedCard, setSelectedCard] = useState(null)
    const [selectedSideA, setSelectedSideA] = useState(true)

    //===[Functions]==========================================
    function handleFormChange (e) {
        setFormState({...formState, [e.target.name]:e.target.value});
    }
    async function handleFormSubmit(e) {
        e.preventDefault()
        try {
            const mutationResponse = await addCard({
                variables: {
                    deckId: deck._id,
                    sideATitle: formState.sideATitle,
                    sideBTitle: formState.sideBTitle,
                    sideADescription: formState.sideADescription,
                    sideBDescription: formState.sideBDescription
                }
            });
            setFormState({sideATitle:'',sideADescription:'',sideBTitle:'',sideBDescription:''});
            refetch();
            setSelectedCard(null);
            const updatedCardArray = (mutationResponse.data.addCard.decks.find(x => x._id === deck._id));
            dispatch(updateCards(updatedCardArray));
        }
        catch (error) {
            console.log(error)
        }
    }
    async function handleDeleteCard (e) {
        e.preventDefault();
        try {
            const mutationResponse = await deleteCard({
                variables: {
                    deckId: deck._id,
                    cardId: selectedCard._id,
                }
            });
            
            refetch();
            setFormState({sideATitle:'',sideADescription:'',sideBTitle:'',sideBDescription:''});
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
        <>    
        <div className='container'>
        <div className='new-card-form'>
                <h2>Add Cards to {deck.title}</h2>
                
                    <form>
                    <div className='flex-left'>
                        <div className='side-form side-a'>
                            <h3>Side A</h3>
                            <label htmlFor="sideATitle">Side A Title: </label>
                            <input required={true} type="text" id="sideATitle" name="sideATitle" placeholder="Title for Side A" onChange={handleFormChange} value={formState.sideATitle}></input>
                            <br/>
                            <label htmlFor="sideADescription">Side A Description: </label>
                            <br/>
                            <textarea required={true} type="text" id="sideADescription" name="sideADescription" placeholder="Title for Side A" onChange={handleFormChange} value={formState.sideADescription}></textarea>
                        </div>
                        <div className='side-form side-b'>
                            <h3>Side B</h3>
                            <label htmlFor="sideBTitle">Side B Title: </label>
                            <input required={true} type="text" id="sideBTitle" name="sideBTitle" placeholder="Title for Side A" onChange={handleFormChange} value={formState.sideBTitle}></input>
                            <br/>
                            <label htmlFor="sideBDescription">Side B Description: </label>
                            <br/>
                            <textarea required={true} type="text" id="sideBDescription" name="sideBDescription" placeholder="Title for Side A" onChange={handleFormChange} value={formState.sideBDescription}></textarea>
                        </div>
                    </div>
                    <button className='add-card-button' onClick={handleFormSubmit}>Add Card</button>
                    {selectedCard && <button className='add-card-button' onClick={handleDeleteCard}>Delete Card</button>}
                </form>
            
                
            </div>
        </div>        
            
        <div className='container card-list-container'>
            {(deck.cards.length > 0) &&
            <ul className='card-list'>
                <h3>Cards</h3>
                {deck.cards.map(card => (
                    <li onClick={() => {setSelectedCard(card); setFormState({sideATitle:card.sideATitle,sideADescription:card.sideADescription,sideBTitle:card.sideBTitle,sideBDescription:card.sideBDescription});}} key={card._id} className={`${(selectedCard?._id === card._id) && "selected-card"}`}>
                        {card.sideATitle} - {card.sideBTitle} 
                    </li>
                ))}
            </ul>
            }
        </div>

        
            
            
            
        </>
        
    );

}

export default Cards;