import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useContext } from "react";
import { AuthContest } from "../Context";
import { toast } from "react-toastify";

const AdminProvider = ({children}) => {
    const {user,userRole,loading,logOut} =useContext(AuthContest);
    const loacation = useLocation();
    if(loading)
    {
        console.log("kdfjkasfklafha")
        return <div className="flex h-screen justify-center items-center">
            <span className="loading loading-bars loading-md"></span>
            <span className=" text-7xl loading loading-bars loading-lg "></span>
        </div>;
    }
    console.log("%c I'm Here", "background-color: red; color: white");
    console.log(user,userRole);
    if(user && userRole=="admin") 
        return children;
    logOut();
    toast.warning("You don't have permission")
    return <Navigate state ={{from:loacation.state}} to={'/login'}></Navigate>;
};

AdminProvider.propTypes = {
    children: PropTypes.object
};
export default AdminProvider;