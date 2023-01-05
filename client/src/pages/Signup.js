import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";


const Signup = (props) => {
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [addUser, {error}] = useMutation(ADD_USER);

    const handleFormChange = (event) => {
        const {name, value} = event.target;
        setFormState({
            ...formState,
            [name]:value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await addUser({
                variables: {username: formState.username, password: formState.password},
            });
            const token = response.data.addUser.token
            Auth.login(token);
            props.setPageSelected("Home");
        }
        catch (error) {
            console.log(formState);
            console.log(error)
        }  
    }

    return (
        <>
            
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username: </label>
                <input name="username" type="username" id="username" onChange={handleFormChange}/>

                <label htmlFor="password">Password: </label>
                <input name="password" type="password" id="password" onChange={handleFormChange}/>

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default Signup;