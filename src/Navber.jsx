import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContest } from "./Context";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetRole from "./hook/useGetRole";
const Navber = () => {
    const {user, logOut}=useContext(AuthContest);
    const userRole = useGetRole();
    console.log(userRole,"User role is")
    return (
        <div className="flex justify-between mx-20 my-5">
            <div className=" flex justify-center items-center">
                <img className="h-20 w-20"src='https://i.ibb.co/mJ2Jz0G/Screenshot-2023-11-24-201308.png'></img>
                <p className="text-5xl font-bold">Crowd<span className="text-[#ff715b]">Choice</span></p>
            </div>
            <div className="flex space-x-2">
                { !user ? <NavLink to='/login'>Login</NavLink>:
                    <p>
                        { userRole=="user" && <Link to="/beProUser" className="btn btn-outline btn-primary">Be ProUser</Link>}
                        <button onClick={()=>{logOut()}}>logOut</button>
                    </p>

                }
            </div>
            <ToastContainer position="bottom-center">
            </ToastContainer>
        </div>
    );
};

export default Navber;