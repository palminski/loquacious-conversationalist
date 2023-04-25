import { useParams } from "react-router-dom";
import { QUERY_DECK } from "../utils/queries";
import { useQuery } from "@apollo/client";


function ReviewShared() {

    const {id: deckId} = useParams();

    
    //===[Queries]=============================================   
    const {loading, data, refetch} = useQuery(QUERY_DECK, {
        variables: {deckId: "64482ff48951f7b1951a0d15"}
    });
    const deck = (data?.deck)

    console.log(deck)
    return (
        <>
        <h1>Viewing Deck with ID: {deckId}</h1>
        <h1>Title: {deck.title}</h1>
        </>
    )
}

export default ReviewShared;