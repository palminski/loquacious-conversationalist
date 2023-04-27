import { useParams } from "react-router-dom";
import { QUERY_DECK } from "../utils/queries";
import { useQuery } from "@apollo/client";


function ReviewShared() {

    const { id: deckId } = useParams();

    console.log(deckId)
    //===[Queries]=============================================   
    const { loading, data } = useQuery(QUERY_DECK, {
        variables: { deckId: deckId }
    });
    console.log(data);
    const deck = (data?.deck)

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
                            <h1>Viewing Deck with ID: {deckId}</h1>
                            <h1>Title: {deck.title}</h1>
                        </>
                        :
                        <>
                            <h1>Deck not found...</h1>
                        </>}
                </>
            }

        </>
    )
}

export default ReviewShared;