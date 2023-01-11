import {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import { ADD_DECK } from '../utils/mutations';
import {QUERY_CURRENT_USER} from "../utils/queries"

const AddDeckModal = () => {
    
    //===[States]=============================================
    const [formState, setFormState] = useState({title:'',description:''})

    //===[Queries]=============================================
    const {refetch} = useQuery(QUERY_CURRENT_USER);

    //===[Mutations]=============================================
    const [addDeck] = useMutation(ADD_DECK);

    //===[Functions]=============================================
    function handleFormChange (e) {
        setFormState({...formState, [e.target.name]:e.target.value});
    }

    async function handleFormSubmit (e) {
        e.preventDefault();
        console.log(formState);
        setFormState({title:'',description:''}); 
        try {
            const mutationResponse = await addDeck({
                variables: {
                    title: formState.title,
                    description: formState.description
                }
            });
            refetch();
        }
        catch (error) {
            console.log(error)
        }
        
    }
    //===[Return]=============================================
    return(
        <>
        <h1>Add Deck</h1>
        <form onSubmit={handleFormSubmit}>
            <label htmlFor="title">Deck Title: </label>
            <input required={true} type="text" id="title" name="title" placeholder="Deck Title" onChange={handleFormChange} value={formState.title}></input>
            <br/>
            <label htmlFor="description">Deck Description: </label>
            <input type="text" id="description" name="description" placeholder="Deck Description" onChange={handleFormChange} value={formState.description}></input>
            <button>Save</button>
        </form>
        </>
    )
}
export default AddDeckModal;