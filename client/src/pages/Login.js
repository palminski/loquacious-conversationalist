import { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from '../utils/auth';
import { LOGIN_USER } from "../utils/mutations";
import Alert from "../components/Alert";


const Login = (props) => {

    const [login, { error }] = useMutation(LOGIN_USER);
    const [formState, setFormState] = useState({ username: '', password: '' });
    const [alertState, setAlertState] = useState(false);

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setAlertState(false);
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await login({
                variables: { username: formState.username, password: formState.password },
            });
            const token = response.data.loginUser.token
            Auth.login(token);
            window.location = "/";
        }
        catch (error) {

            setAlertState(true);
            // setFormState({ username: '', password: '' });
        }

        
    }

    return (
        <div className="grow-in">
            <div className="container">
                <form onSubmit={handleFormSubmit} className="signup-login">
                    <h1>Log In</h1>
                    <label htmlFor="username">Username: </label>
                    <br />
                    <input name="username" type="username" id="username" value={formState.username} onChange={handleFormChange} />
                    <br />

                    <label htmlFor="password">Password: </label>

                    <br />
                    <input name="password" type="password" id="password" value={formState.password} onChange={handleFormChange} />
                    <br />

                    <button className="log-in-button" type="submit">Submit</button>
                </form>
                {alertState && <Alert message={"Unable to login. Please check your login information"}></Alert>}
            </div>
        </div>
    );
}

export default Login;