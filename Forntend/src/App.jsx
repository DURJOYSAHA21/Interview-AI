import {RouterProvider} from 'react-router' // used for being able to use the router object that was created in the app.routes.jsx file to provide routing functionality to the entire application. It allows the application to navigate between different pages based on the defined routes.
import {router} from './app.routes.jsx' // import {router} from './app.routes.jsx' for react-router-dom v6.4 and above
import {AuthProvider} from "./features/auth/auth.context.jsx" // import {AuthProvider} from "./features/auth/auth.context.jsx" to provide the authentication context to the entire application. It allows the application to share the authentication state and functions across different components.
function App() {
  
  return (
    <AuthProvider> // Wrap the application with the AuthProvider to provide the authentication context to all child components. This allows the application to access the authentication state and functions from any component within the application.
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
