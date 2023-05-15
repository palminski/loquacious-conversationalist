import { useParams } from "react-router-dom";
import { QUERY_DECK, QUERY_CURRENT_USER } from "../utils/queries";
import { COPY_DECK } from "../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Auth from "../utils/auth";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'

function ReviewShared() {

    const { id: deckId } = useParams();


    //===[Queries]=============================================   
    const { loading, data } = useQuery(QUERY_DECK, {
        variables: { deckId: deckId }
    });

    const {refetch} = useQuery(QUERY_CURRENT_USER);


    const deck = (data?.deck)
    let copyArray = []
    if (deck) {
        copyArray = [...deck.cards]
    }
    //==[Mutations]===========================================
    const [copyDeck] = useMutation(COPY_DECK);

    //===[States]=============================================

    const [copied, setCopied] = useState(false);

    const [cardsToReview, setCardsToReview] = useState(shuffleArray(copyArray));
    const [sideA, setSideA] = useState(true);
    const [descriptionVisable, setDescriptionVisable] = useState(false);
    const [lastCard, setLastCard] = useState('none');
    const [flipState, setFlipState] = useState(true)


    //===[Functions]==============================================

    //--Handle Copy
    async function handleCopy() {
        try {
            setCopied(true);
            await copyDeck({
                variables: {
                    deckId: deckId
                }
            });
            
            refetch();
        }
        catch(error) {
            setCopied(false);
            console.log(error)
        }
    }
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
        setFlipState(+ new Date());
        handleCover("correct");
        setCardsToReview(copyArray);

    }
    const handleIncorrect = () => {
        copyArray = [...cardsToReview];
        copyArray.push(copyArray.shift());
        setSideA(true);
        setDescriptionVisable(false);
        setFlipState(+ new Date());
        handleCover("incorrect");
        setCardsToReview(copyArray);
    }

        //--handle flip
        const handleFlip = () => {
            setSideA(!sideA)
            setFlipState(+ new Date());
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

    return (
        <>
            {loading ?
                <>
                    <h1>Loading...</h1>
                </>
                :
                <>
                    {deck ?
                        <>
                            <div className='container grow-in'>
                                {cardsToReview.length > 0 ?
                                    <>
                                        <div key={flipState} className={`flashcard `}>
                                            <h2 className="flashcard-deck-title">{deck.title} - <span className='review-number'>{cardsToReview.length} cards left to review</span></h2>
                                            {sideA ?
                                                <>
                                                    <div className='flashcard-body side-a' style={{animationName: "flip-over"}}>
                                                        <h2 className='card-title'>{cardsToReview[0].sideATitle}</h2>
                                                        {cardsToReview[0].sideADescription ?
                                                            <>
                                                                <h2 className='card-description'>
                                                                    {descriptionVisable && <span>{cardsToReview[0].sideADescription}</span>}
                                                                </h2>
                                                                <button className='flip-button' onClick={() => setDescriptionVisable(!descriptionVisable)}>Reveal Description</button>
                                                            </>
                                                            :
                                                            <>
                                                                <h2 className='card-description zero-opacity'>
                                                                </h2>
                                                            </>
                                                        }
                                                        <button className='flip-button' onClick={handleFlip}>Flip Card</button>
                                                    </div>
                                                </>
                                                :
                                                <>
                                                    <div className='flashcard-body side-b' style={{animationName: "flip-over"}}>
                                                        <h2 className='card-title'>{cardsToReview[0].sideBTitle}</h2>
                                                        {cardsToReview[0].sideBDescription ?
                                                            <>
                                                                <h2 className='card-description'>
                                                                    {descriptionVisable && <span>{cardsToReview[0].sideBDescription}</span>}
                                                                </h2>
                                                                <button className='flip-button' onClick={() => setDescriptionVisable(!descriptionVisable)}>Reveal Description</button>
                                                            </>
                                                            :
                                                            <>
                                                                <h2 className='card-description zero-opacity'>
                                                                </h2>
                                                            </>
                                                        }
                                                        <button className='flip-button' onClick={handleFlip}>Flip Card</button>
                                                    </div>
                                                </>
                                            }
                                        </div>
                                        <div className='button-container'>
                        <button className='tab correct' onClick={() => handleCorrect()}>Correct</button>
                        <button className="tab incorrect" onClick={() => handleIncorrect()}>Incorrect</button>
                        </div>
                                    </>
                                    :
                                    <>
                                        

                                            <div className='no-deck-warning'>
                                                <h1>{deck.title}</h1>
                                                {deck.description && <h2>{deck.description}</h2>}
                                                <hr></hr>
                                                {deck.cards.length > 0 ?
                                                    <>
                                                        <h2>Click the button below to shuffle this deck and start reviewing cards!</h2>
                                                        <button onClick={() => reshuffleCards()}>Reshuffle</button>
                                                    </>
                                                    :
                                                    <>
                                                        <h2>This deck currently contains no cards...</h2>
                                                    </>}

                                            </div>
                                            

                                    </>
                                }
                                {lastCard === "correct" && <div className='feedback-cover correct-cover'></div>}
                                {lastCard === "incorrect" && <div className='feedback-cover incorrect-cover'></div>}
                            </div>
                        </>
                        :
                        <>
                            <h1>Deck not found...</h1>
                        </>}
                    {(Auth.loggedIn() && !copied) && 
                    <>
                    <h3>Click Button Below to Copy This Deck!</h3>
                    <FontAwesomeIcon onClick={handleCopy} className='icon-button' icon={faFloppyDisk} />
                    </>}
                </>
            }

        </>
    )
}

export default ReviewShared;