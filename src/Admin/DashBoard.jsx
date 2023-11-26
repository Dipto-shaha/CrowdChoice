import { NavLink, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const DashBoard = () => {
    return (
        <div>
            <NavLink to ='/admin/user'>UserList</NavLink>
            <NavLink to='/admin/paymentHistory'>Paymet History</NavLink>
            <NavLink to='/admin/surveyStaus'>Servey</NavLink>
            <Outlet></Outlet>
            <NavLink></NavLink>
            <ToastContainer position="bottom-center">
            </ToastContainer>
        </div>
    );
};

export default DashBoard;