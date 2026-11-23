import {createContext, useState} from "react";

export const AuthContext = createContext(); // Create a context for authentication context doing this we can share the authentication state and functions across different components in the application

export const AuthProvider = ({children}) => { // Create a provider component that will wrap the application and provide the authentication context to its children. children is a special prop that represents the child components that will be wrapped by the provider. child component means the component that is wrapped by the provider and will have access to the authentication context
    
    const [user, setUser] = useState(null); // State to hold the authenticated user information
    const [loading, setLoading] = useState(false); // State to indicate if the authentication status is being checked

    return (
        <AuthContext.Provider value={{user, setUser, loading, setLoading}}> {/* Provide the authentication state and functions to the child components */}
            {children} // Render the child components that are wrapped by the provider
        </AuthContext.Provider>
    )



}