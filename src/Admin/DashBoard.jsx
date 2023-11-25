import { NavLink, Outlet } from "react-router-dom";

const DashBoard = () => {
    return (
        <div>
            <NavLink to ='/admin/user'>UserList</NavLink>
            <Outlet></Outlet>
            <NavLink></NavLink>
        </div>
    );
};

export default DashBoard;