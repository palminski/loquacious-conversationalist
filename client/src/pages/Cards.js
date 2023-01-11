import {useSelector, useDispatch} from 'react-redux';
import {
    setDeck, selectDeck
} from '../utils/slices/deckSlice'

const Cards = () => {
    const dispatch = useDispatch();
    console.log(useSelector(selectDeck));
    const deck = useSelector(selectDeck);

    return (
        <>
            <h1>CARDS</h1>
            <h2>Deck Name - {deck.title}</h2>
            <h2>Deck Description - {deck.description}</h2>
            <h2>Cards in Deck - {deck.cards.length}</h2>
            <button onClick={() => dispatch(setDeck({
                title: "New Selected Deck",
                description: "new selected description",
                cards: [0,1,2]
            }))}>Click Me</button>
        </>
        
    );

}

export default Cards;