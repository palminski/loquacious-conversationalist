import { selectDeck } from '../utils/slices/deckSlice';
import {useState} from 'react';
import { useSelector } from 'react-redux';

const Review = () => {
    //===[Redux]==============================================
    const deck = useSelector(selectDeck);


    let allCards = deck.cards;
    let [cardsToReview,setCardsToReview] = useState(allCards.map(card => ({...card, active: true})))

    
    
//===[Functions]==============================================
    const updateCardsToReview = (index) => {
        console.log(index)
        let updatedArray = [...cardsToReview];
        updatedArray[index].active = !cardsToReview[index].active;
        console.log(updatedArray)
        setCardsToReview(updatedArray);
        
    }


    //===[RETURN JSX]===============================================================================

    return (
        <div className="grow-in">
            <div className="container">

                <ul className="deck-list">
                    <h2>Select Cards to Review from {deck.title}</h2>
                    {cardsToReview && cardsToReview.map(card => (
                        <li className={`${card.active === true && "card-to-review"}`} key={card._id} onClick={() => updateCardsToReview(cardsToReview.indexOf(card))}>
                            <h2>{card.sideATitle} / {card.sideBTitle}</h2>
                        </li>


                    ))}

                </ul>

            </div>

        </div>

    )
}

export default Review;