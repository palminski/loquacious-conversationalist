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
    let [sideA, setSideA] = useState(true);




    //===[Functions]==============================================

    const updateSelectedCards = (index) => {
        console.log(index)
        let updatedArray = [...selectedCards];
        updatedArray[index].active = !selectedCards[index].active;
        console.log(updatedArray)
        setSelectedCards(updatedArray);
    }

    //--review and select page modes
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

    //--Correct/Incorrect
    const handleCorrect = () => {
        let updatedArray = [...cardsToReview];
        updatedArray.shift();
        setCardsToReview(updatedArray);
        setSideA(true);
    }
    const handleIncorrect = () => {
        let updatedArray = [...cardsToReview];
        updatedArray.push(updatedArray.shift());
        setCardsToReview(updatedArray);
        setSideA(true);
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
                                <li className={`${card.active === true && "card-to-review"}`} key={card._id} onClick={() => updateSelectedCards(selectedCards.indexOf(card))}>
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
                            <div className='flashcard'>
                            <h1>{sideA ? cardsToReview[0].sideATitle : cardsToReview[0].sideBTitle}</h1>
                            {sideA ?
                                    <div className='flashcard-body-a'>
                                        
                                        <h2>{cardsToReview[0].sideADescription}</h2>
                                        
                                    </div>
                                    :
                                    <div className='flashcard-body-b'>
                                        
                                        <h2>{cardsToReview[0].sideBDescription}</h2>
                                    </div>
                                }
                            </div>
                                
                                
                                <button className="add-button tab" onClick={() => setSideA(!sideA)}>Flip Card</button>
                                <button className="add-button tab" onClick={() => handleCorrect()}>Correct</button>
                                <button className="add-button tab" onClick={() => handleIncorrect()}>Incorrect</button>
                                
                                
                                

                            </>
                        }
                        <button className="add-button tab" onClick={changeModeSelect}>Review Selected Cards</button>
                    </>
                }



            </div>

        </div>

    )
}

export default Review;