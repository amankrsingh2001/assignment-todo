import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import User from "../components/User";
import Todo from "../components/Todo";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                index:true,
                element:<User/>
            },{
                path:'/todo',
                element:<Todo/>
            }
        ]
    }
])


export default router