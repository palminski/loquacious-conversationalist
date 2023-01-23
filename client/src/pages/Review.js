import { selectDeck } from '../utils/slices/deckSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Review = () => {
    //===[Redux]==============================================
    const deck = useSelector(selectDeck);

    //===[States]=============================================
    let allCards = deck.cards;
    let [selectedCards, setSelectedCards] = useState(allCards.map(card => ({ ...card, active: true })))
    let [mode, setMode] = useState("select");
    let [cardsToReview, setCardsToReview] = useState([]);
    let [currentCardIndex,setCurrentCardIndex] = useState(0)



    //===[Functions]==============================================
    const updateselectedCards = (index) => {
        console.log(index)
        let updatedArray = [...selectedCards];
        updatedArray[index].active = !selectedCards[index].active;
        console.log(updatedArray)
        setSelectedCards(updatedArray);
    }

    const changeModeReview = () => {
        let cardsToAdd = []
        selectedCards.map(card => {
            if (card.active === true) {
                cardsToAdd.push(card)
            }
        });
        setCardsToReview(cardsToAdd);
        setMode('review');
        
    }
    const changeModeSelect = () => {
        
        setMode('select');
        
    }
    

    //===[RETURN JSX]===============================================================================

    return (
        <div className="grow-in">
            <div className="container">

                {mode === "select" &&
                    <>
                        <ul className="deck-list">
                            <h2>Select Cards to Review from {deck.title}</h2>
                            {selectedCards && selectedCards.map(card => (
                                <li className={`${card.active === true && "card-to-review"}`} key={card._id} onClick={() => updateselectedCards(selectedCards.indexOf(card))}>
                                    <h2>{card.sideATitle} / {card.sideBTitle}</h2>
                                </li>


                            ))}
                        </ul>
                        <button className="add-button" onClick={changeModeReview}>Review Selected Cards</button>
                    </>
                }
                {mode === 'review' &&
                    <>
                    {cardsToReview[0] &&
                        <>
                            <h1>{cardsToReview[0].sideATitle}</h1>
                        </>
                    }
                    <button className="add-button" onClick={changeModeSelect}>Review Selected Cards</button>
                    </>
                }



            </div>

        </div>

    )
}

export default Review;