import { Outlet } from "react-router-dom";
import Navber from "./Navber";

const All = () => {
    return (
        <div className="mx-16">
            <Navber></Navber>
            <Outlet></Outlet>
        </div>
    );
};

export default All;