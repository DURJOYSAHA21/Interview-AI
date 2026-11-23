import React,{useState} from "react";
import {useNavigate} from "react-router";
import "../auth.form.scss";
import {useAuth} from "../hooks/useAuth.js"; // import {useAuth} from "../hooks/useAuth.js" to access the authentication context and functions that were created in the useAuth.js file. It allows us to perform authentication operations such as login, register, logout, and verify user status.
const Login = () => {

    const navigate = useNavigate(); //useNavigate is a hook that allows us to navigate between pages
    const {handleLogin, loading} = useAuth(); // const {handleLogin, loading} = useAuth(); to destructure the authentication context and access the handleLogin function and loading state. It allows us to perform the login operation and manage the loading state during the authentication process.

    const [email, setEmail] = React.useState(""); // const [email, setEmail] = React.useState(""); to create a state variable for the email input field and a function to update its value. It allows us to manage the email input value during the login process.
    const [password, setPassword] = React.useState(""); // const [password, setPassword] = React.useState(""); to create a state variable for the password input field and a function to update its value. It allows us to manage the password input value during the login process.

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({email, password});
    };
    if (loading) {
        return <div>Loading...</div>; // return <div>Loading...</div>; to display a loading message while the authentication operation is in progress. It allows us to provide feedback to the user during the login process.
    }
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                       <label htmlFor="email">Email</label>
                       <input onchange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>
                    <div className="input-group">
                          <label htmlFor="password">Password</label>
                            <input onchange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter your password" required />
                    </div>
                    <button className="button primary-button">Login</button>
                </form>

                <p>Don't have an account? <span className="link" onClick={() => navigate("/register")}>Register</span></p>
            </div>
        </main>
    );
};

export default Login;