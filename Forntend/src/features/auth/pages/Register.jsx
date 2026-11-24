import React, { useState } from "react";
import {useNavigate} from "react-router";
import { useAuth } from "../hooks/useAuth";
import "../auth.form.scss";

const Register = () => {
    const navigate = useNavigate(); //useNavigate is a hook that allows us to navigate between pages

    const [name, setName] = React.useState(""); // const [name, setName] = React.useState(""); to create a state variable for the name input field and a function to update its value. It allows us to manage the name input value during the registration process.
    const [email,setEmail] = React.useState(""); 
    const [password, setPassword] = React.useState("");
    
    const {handleRegister, loading} = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault();
        handleRegister({name, email, password});
        navigate("/login");

    }
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                       <label htmlFor="name">Name</label>
                       <input onChange={(e) => setName(e.target.value)} type="text" id="name" name="name" placeholder="Enter your name" required />
                    </div>
                    <div className="input-group">
                       <label htmlFor="email">Email</label>
                       <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>
                    <div className="input-group">
                          <label htmlFor="password">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter your password" required />
                    </div>
                    <button className="button primary-button">Register</button>
                </form>

                <p>Already have an account? <span className="link" onClick={() => navigate("/login")}>Login</span></p>
            </div>
        </main>
    );
};

export default Register;