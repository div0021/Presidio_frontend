import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import HomePage from "./pages/Home/HomePage";
import Layout from "./pages/Layout/Layout";
import AddProperty from "./pages/AddProperty/AddProperty";
import Property from "./pages/Property/Property";

const router = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            {
                path:"/",
                element:<Layout />,
                children:[

                    {
                        path:"/",
                        element:<HomePage />,
                    },
                    {
                        path:"property/:id",
                        element:<Property />
                    },
                    {
                        path:"addproperty",
                        element:<AddProperty />
                    }

                ]
            },
            {
                path:"signup",
                element:<Signup />
            },
            {
                path:"login",
                element:<Login />
            }
        ]
    }
]);
export default router;