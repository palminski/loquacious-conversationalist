import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import Alert from "../components/Alert";


const Signup = (props) => {

    const [formState, setFormState] = useState({ username: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);
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
            const response = await addUser({
                variables: { username: formState.username, password: formState.password },
            });
            const token = response.data.addUser.token
            Auth.login(token);
            window.location = "/";

        }
        catch (error) {

            setAlertState(true);
        }
        
    }

    return (
        <div className="grow-in">
            <div className="container">
                <form onSubmit={handleFormSubmit} className="signup-login">
                    <h1>Sign Up</h1>
                    <label htmlFor="username">Username: </label>
                    <br />
                    <input name="username" type="username" id="username" onChange={handleFormChange} />
                    <br />

                    <label htmlFor="password">Password: </label>

                    <br />
                    <input name="password" type="password" id="password" onChange={handleFormChange} />
                    <br />

                    <button className="log-in-button" type="submit">Submit</button>
                </form>
                {alertState && <Alert message={"Unable to signup. Username already taken"}></Alert>}
            </div>

        </div>
    );
}

export default Signup;