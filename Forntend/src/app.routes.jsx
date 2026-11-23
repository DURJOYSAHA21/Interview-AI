import {createBrowserRouter} from "react-router"; // import {createBrowserRouter} from "react-router-dom"; for react-router-dom v6.4 and above

import Login from "./features/auth/pages/login";
import Register from "./features/auth/pages/Register";

const router = createBrowserRouter([ // const router = createBrowserRouter([ // for react-router-dom v6.4 and above
    {
        path: "/login", //path means the URL path for the route, in this case, it is "/login" which means that when the user navigates to "/login" in the browser, the Login component will be rendered.
        element: <Login />, // element means the React component that will be rendered when the user navigates to the specified path, in this case, it is the Login component which will be rendered when the user navigates to "/login".
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export {router}; // export {router}; for react-router-dom v6.4 and above