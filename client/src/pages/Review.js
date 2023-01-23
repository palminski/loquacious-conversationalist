import {selectDeck} from '../utils/slices/deckSlice';
import {useSelector} from 'react-redux';

const Review = () => {
    //===[Redux]==============================================
    
    const deck = useSelector(selectDeck);


    return (
        <div className="grow-in"> 
            <h1>REVIEW {deck.title}</h1>
        </div>
    )
}

export default Review;