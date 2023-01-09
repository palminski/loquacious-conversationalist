import {useState} from 'react';

const AddDeckModal = () => {

    const [formState, setFormState] = useState({title:'',description:''})

    function handleFormChange (e) {
        setFormState({...formState, [e.target.name]:e.target.value});
    }

    function handleFormSubmit (e) {
        e.preventDefault();
        console.log(formState);
        setFormState({title:'',description:''});
    }

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