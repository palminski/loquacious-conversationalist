import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth';
import { LOGIN_USER } from "../utils/mutations";


const Login = (props) => {
    
    const [login, {error}] = useMutation(LOGIN_USER);
    const [formState, setFormState] = useState({ username: '', password: '' });

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
            const response = await login({
                variables: {username: formState.username, password: formState.password},
            });
            const token = response.data.loginUser.token
            Auth.login(token);

        }
        catch (error) {

            console.log(error)
        }  
        
        window.location = "/";
    }

    return (
        <div className="grow-in"> 
            
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="username">Username: </label>
                <br/>
                <input name="username" type="username" id="username" onChange={handleFormChange}/>
                <br/>
                
                <label htmlFor="password">Password: </label>
                
                <br/>
                <input name="password" type="password" id="password" onChange={handleFormChange}/>
                <br/>
                
                <button className="log-in-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Login;