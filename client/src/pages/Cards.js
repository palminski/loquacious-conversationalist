import {useSelector, useDispatch} from 'react-redux';
import {useState} from 'react';
import {
    setDeck, selectDeck
} from '../utils/slices/deckSlice'

const Cards = () => {
    const dispatch = useDispatch();
    console.log(useSelector(selectDeck));
    const deck = useSelector(selectDeck);

    const [formState, setFormState] = useState({sideATitle:'',sideADescription:'',sideBTitle:'',sideBDescription:''})

    function handleFormChange (e) {
        setFormState({...formState, [e.target.name]:e.target.value});
    }
    async function handleFormSubmit(e) {
        e.preventDefault()
        console.log(formState);
    }

    return (
        <>            
            <div className='new-card-form'>
                <h2>Add Cards to {deck.title}</h2>
                <form>
                    <div className='flex-around'>
                        <div className='side-for side-a'>
                            <h3>Side A</h3>
                            <label htmlFor="sideATitle">Side A Title: </label>
                            <input required={true} type="text" id="sideATitle" name="sideATitle" placeholder="Title for Side A" onChange={handleFormChange} value={formState.sideATitle}></input>
                            <label htmlFor="sideADescription">Side A Description: </label>
                            <textarea required={true} type="text" id="sideADescription" name="sideADescription" placeholder="Title for Side A" onChange={handleFormChange} value={formState.sideADescription}></textarea>
                        </div>
                        <div className='side-form side-b'>
                            <h3>Side B</h3>
                            <label htmlFor="sideBTitle">Side B Title: </label>
                            <input required={true} type="text" id="sideBTitle" name="sideBTitle" placeholder="Title for Side A" onChange={handleFormChange} value={formState.sideBTitle}></input>
                            <label htmlFor="sideBDescription">Side B Description: </label>
                            <textarea required={true} type="text" id="sideBDescription" name="sideBDescription" placeholder="Title for Side A" onChange={handleFormChange} value={formState.sideBDescription}></textarea>
                        </div>
                    </div>
                    <button onClick={handleFormSubmit}>Add Card</button>
                </form>
            </div>

            {(deck.cards.length > 0) &&
            <ul>
                <h3>Cards</h3>
                {deck.cards.map(card => (
                    <li key={card._id}>{card.sideATitle} - {card.sideBTitle}</li>
                ))}
            </ul>
            }
            
            
        </>
        
    );

}

export default Cards;