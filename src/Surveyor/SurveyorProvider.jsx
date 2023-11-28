import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthContest } from "../Context";
import { toast } from "react-toastify";

const SurveyorProvider = ({children}) => {
    const {user,userRole,loading,logOut} =useContext(AuthContest);
    const loacation = useLocation();
    if(loading)
    {
        return <div className="flex h-screen justify-center items-center">
            <span className="loading loading-bars loading-md"></span>
            <span className=" text-7xl loading loading-bars loading-lg "></span>
        </div>;
    }
    if(user && userRole=="surveyor") 
        return children;
    logOut();
    toast.warning("You don't have permission")
    return <Navigate state ={{from:loacation.state}} to={'/login'}></Navigate>;
};

SurveyorProvider.propTypes = {
    children: PropTypes.object
};
export default SurveyorProvider;


