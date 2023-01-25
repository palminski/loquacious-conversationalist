import { useQuery } from "@apollo/client";
import {QUERY_ALL_USERS, QUERY_CURRENT_USER} from "../utils/queries"

const Home = () => {
    const {data:me} = useQuery(QUERY_CURRENT_USER);
    const {loading, data} = useQuery(QUERY_ALL_USERS);
    const users = (data?.users)
    const currentUser = me?.currentUser;

    return (
        <div className="grow-in"> 
            
            {currentUser && 
            <>
            <h2>{currentUser.username}'s Decks</h2>
            <ul>
            {currentUser.decks && currentUser.decks.map(deck => (
                <li key={deck._id}>{deck.title} - {deck.cards.length} cards</li>
            ))}
            </ul>
            
            </>
            }
            <h2>All Users</h2>
            <ul>
                {users && users.map(user => (
                    <li key={user._id}>{user.username} - {user._id}</li>
                ))}
            </ul>
        </div>
    )
}

export default Home;