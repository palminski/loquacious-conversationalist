import { selectDeck } from '../utils/slices/deckSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Review = () => {
    //===[Redux]==============================================
    const deck = useSelector(selectDeck);

    //===[States]=============================================
    
    const [cardsToReview,setCardsToReview] = useState(deck.cards);




    //===[Functions]==============================================
    let copyArray = [];

        //--Correct/Incorrect
        const handleCorrect = () => {
            copyArray = [...cardsToReview];
            copyArray.shift();
            setCardsToReview(copyArray); 
        }
        const handleIncorrect = () => {
            let copyArray = [...cardsToReview];
            copyArray.push(copyArray.shift());
            setCardsToReview(copyArray);
        }
    

    //===[RETURN JSX]===============================================================================

    return (
        <>
            <h1>Review</h1>
            {cardsToReview.length > 0 ?
                <>
                    <h1> {cardsToReview[0].sideATitle} - {cardsToReview[0].sideBTitle} </h1>
                    <button onClick={() => handleCorrect()}>Correct</button>
                    <button onClick={() => handleIncorrect()}>Incorrect</button>
                </>
                :
                <>
                    <h1>No cards to review</h1>
                </>
            }
        </>


    )
}

export default Review;