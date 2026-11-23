import {useContext} from "react";
import {AuthContext} from "../auth.context.jsx"; // import {AuthContext} from "../auth.context.jsx" to access the authentication context that was created in the auth.context.jsx file. It allows us to share the authentication state and functions across different components in the application.
import {login,register,logout,verify} from "../services/auth.api.js"; // import {login,register,logout,verify} from "../services/auth.api.js" to access the authentication functions that were created in the auth.api.js file. It allows us to perform authentication operations such as login, register, logout, and verify user status.

export const useAuth = () => { // export const useAuth = () => { to create a custom hook that will provide the authentication context and functions to the components that use this hook. It allows us to access the authentication state and functions from any component within the application.
    const context = useContext(AuthContext); // const context = useContext(AuthContext); to access the authentication context that was created in the auth.context.jsx file. It allows us to share the authentication state and functions across different components in the application.
    const {user, setUser, loading, setLoading} = context; // const {user, setUser, loading, setLoading} = context; to destructure the authentication context and access the user state, setUser function, loading state, and setLoading function. It allows us to manage the authentication state and perform authentication operations such as login, register, logout, and verify user status.

    const handleLogin = async ({email, password}) => { // const handleLogin = async ({email, password}) => { to create a function that will handle the login operation. It takes email and password as parameters and performs the login operation using the login function from the auth.api.js file. It allows us to authenticate the user and update the authentication state. 
        setLoading(true); // setLoading(true); to set the loading state to true to indicate that the login operation is in progress.
        try {
            const data = await login({email, password}); // const data = await login({email, password}); to call the login function from the auth.api.js file and pass the email and password as parameters. It allows us to authenticate the user and receive the response data from the backend API.
            setUser(data.user); // setUser(data.user); to update the user state with the authenticated user information received from the backend API. It allows us to manage the authentication state and share the authenticated user information across different components in the application.
        } catch (error) {
            console.error("Error logging in user:", error); // console.error("Error logging in user:", error); to log any errors that occur during the login operation. It allows us to debug and handle any issues that may arise during the authentication process.
        }
        setLoading(false); // setLoading(false); to set the loading state to false to indicate that the login operation is complete.
    }

    const handleRegister = async ({name, email, password}) => { // const handleRegister = async ({name, email, password}) => { to create a function that will handle the register operation. It takes name, email, and password as parameters and performs the register operation using the register function from the auth.api.js file. It allows us to create a new user account and update the authentication state.
        setLoading(true);
        try {
            const data = await register({name, email, password}); // const data = await register({name, email, password}); to call the register function from the auth.api.js file and pass the name, email, and password as parameters. It allows us to create a new user account and receive the response data from the backend API.
            setUser(data.user); // setUser(data.user); to update the user state with the newly registered user information received from the backend API. It allows us to manage the authentication state and share the authenticated user information across different components in the application.
        } catch (error) {
            console.error("Error registering user:", error); // console.error("Error registering user:", error); to log any errors that occur during the register operation. It allows us to debug and handle any issues that may arise during the authentication process.
        }
        setLoading(false);
    }

    const handleLogout = async () => { // const handleLogout = async () => { to create a function that will handle the logout operation. It performs the logout operation using the logout function from the auth.api.js file. It allows us to log out the authenticated user and update the authentication state.
        setLoading(true);
        try {
            await logout(); // await logout(); to call the logout function from the auth.api.js file. It allows us to log out the authenticated user and receive the response data from the backend API.
            setUser(null); // setUser(null); to update the user state to null to indicate that there is no authenticated user. It allows us to manage the authentication state and share the updated authentication state across different components in the application.
        } catch (error) {
            console.error("Error logging out user:", error); // console.error("Error logging out user:", error); to log any errors that occur during the logout operation. It allows us to debug and handle any issues that may arise during the authentication process.
        }
        setLoading(false);
    }

    return {user, loading, handlelogin, handleRegister, handleLogout}; // return {user, loading, handlelogin, handleRegister, handleLogout}; to return the user state, loading state, and authentication functions to the components that use this custom hook. It allows us to access the authentication state and functions from any component within the application.
    
}