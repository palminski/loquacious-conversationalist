import { selectDeck } from '../utils/slices/deckSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Review = () => {
    //===[Redux]==============================================
    const deck = useSelector(selectDeck);
    let copyArray = [...deck.cards];
    //===[States]=============================================

    const [cardsToReview, setCardsToReview] = useState(shuffleArray(copyArray));
    const [sideA, setSideA] = useState(true);
    const [descriptionVisable, setDescriptionVisable] = useState(false);
    const [lastCard, setLastCard] = useState('none');



    //===[Functions]==============================================

    //--Shuffle
    function shuffleArray(array) {   //Hoisted to top
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    //--Correct/Incorrect
    const handleCorrect = () => {
        copyArray = [...cardsToReview];
        copyArray.shift();
        setSideA(true);
        setDescriptionVisable(false);

        handleCover("correct");
        setCardsToReview(copyArray);

    }
    const handleIncorrect = () => {
        copyArray = [...cardsToReview];
        copyArray.push(copyArray.shift());
        setSideA(true);
        setDescriptionVisable(false);

        handleCover("incorrect");
        setCardsToReview(copyArray);
    }

    //--handle cover
    const handleCover = (lastCard) => {
        setLastCard(lastCard);
        setTimeout(() => {
            setLastCard("none");
        }, 500)
    }

    //--reshuffle
    const reshuffleCards = () => {
        copyArray = [...deck.cards];

        setCardsToReview(shuffleArray(copyArray))
    }




    //===[RETURN JSX]===============================================================================

    return (
        <div className='review-background'>
            <div className='container grow-in'>
                {cardsToReview.length > 0 ?
                    <>
                        <div className={`flashcard `}>
                            <h2 className="flashcard-deck-title">{deck.title} - <span className='review-number'>{cardsToReview.length} cards left to review</span></h2>
                            {sideA ?
                                <>
                                    <div className='flashcard-body'>
                                        <h2 className='card-title'>{cardsToReview[0].sideATitle}</h2>
                                        {cardsToReview[0].sideADescription &&
                                            <>

                                                <h2 className='card-description'>

                                                    {descriptionVisable && <span>{cardsToReview[0].sideADescription}</span>}

                                                </h2>
                                                <button className='flip-button' onClick={() => setDescriptionVisable(!descriptionVisable)}>Reveal Description</button>
                                            </>
                                        }

                                        <button className='flip-button' onClick={() => setSideA(!sideA)}>Flip Card</button>
                                    </div>

                                </>

                                :
                                <>
                                    <div className='flashcard-body'>
                                        <h2 className='card-title'>{cardsToReview[0].sideBTitle}</h2>
                                        {cardsToReview[0].sideBDescription &&
                                            <>

                                                <h2 className='card-description'>

                                                    {descriptionVisable && <span>{cardsToReview[0].sideBDescription}</span>}

                                                </h2>
                                                <button className='flip-button' onClick={() => setDescriptionVisable(!descriptionVisable)}>Reveal Description</button>
                                            </>
                                        }

                                        <button className='flip-button' onClick={() => setSideA(!sideA)}>Flip Card</button>

                                    </div>

                                </>

                            }

                        </div>

                        <button className='tab correct' onClick={() => handleCorrect()}>Correct</button>
                        <button className="tab incorrect" onClick={() => handleIncorrect()}>Incorrect</button>
                    </>
                    :
                    <>
                        {deck.title ?
                            <>
                                <h1>All Cards Reviewed!</h1>
                                <button onClick={() => reshuffleCards()}>Reshuffle</button>

                            </>
                            :
                            <>
                                <h1>No deck Selected</h1>
                            </>
                        }

                    </>
                }
            </div>
            {lastCard === "correct" && <div className='feedback-cover correct-cover'></div>}
            {lastCard === "incorrect" && <div className='feedback-cover incorrect-cover'></div>}
        </div>




    )
}

export default Review;