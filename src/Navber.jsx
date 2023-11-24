import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContest } from "./Context";

const Navber = () => {
    const {user, logOut}=useContext(AuthContest);
    return (
        <div className="flex justify-between mx-20 my-5">
            <div className=" flex justify-center items-center">
                <img className="h-20 w-20"src='https://i.ibb.co/mJ2Jz0G/Screenshot-2023-11-24-201308.png'></img>
                <p className="text-5xl font-bold">Crowd<span className="text-[#ff715b]">Choice</span></p>
            </div>
            <div className="">
                <NavLink to='/login'>Login</NavLink>
            </div>
            {user && <p>{user.email}</p>}
            <button onClick={()=>{logOut()
            }}>logOut</button>
        </div>
    );
};

export default Navber;