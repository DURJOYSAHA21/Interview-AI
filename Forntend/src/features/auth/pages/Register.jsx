import React from "react";
import {useNavigate} from "react-router";
import "../auth.form.scss";

const Register = () => {
    const navigate = useNavigate(); //useNavigate is a hook that allows us to navigate between pages
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                       <label htmlFor="name">Name</label>
                       <input type="text" id="name" name="name" placeholder="Enter your name" required />
                    </div>
                    <div className="input-group">
                       <label htmlFor="email">Email</label>
                       <input type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>
                    <div className="input-group">
                          <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password" required />
                    </div>
                    <button className="button primary-button">Register</button>
                </form>

                <p>Already have an account? <span className="link" onClick={() => navigate("/login")}>Login</span></p>
            </div>
        </main>
    );
};

export default Register;