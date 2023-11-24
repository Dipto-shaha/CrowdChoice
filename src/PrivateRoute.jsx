import { useContext } from "react";
import { AuthContest } from "./Context";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

const PrivateRoute = ({children}) => {
    const {user,loading} =useContext(AuthContest);
    const loacation = useLocation();
    if(loading)
    {
        return <div className="flex h-screen justify-center items-center">
            <span className="loading loading-bars loading-md"></span>
            <span className=" text-7xl loading loading-bars loading-lg "></span>
        </div>;
    }
    if(user) 
        return children;
    return <Navigate state ={{from:loacation.state}} to={'/login'}></Navigate>;
};
PrivateRoute.propTypes = {
    children: PropTypes.object
};
export default PrivateRoute;