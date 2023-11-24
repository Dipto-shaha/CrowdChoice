import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <img src="https://i.ibb.co/JqCGBhX/Screenshot-2023-11-04-221935.png" alt="" />
            <button className="btn px-10 bg-[#007dfe] text-[#FFF]"><Link to='/'>Back to Home</Link> </button>       
         </div>
    );
};

export default ErrorPage;