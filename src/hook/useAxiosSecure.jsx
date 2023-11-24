import axios from "axios";


const axiosPrivate = axios.create({
    baseURL:'https:localhost'
})
const useAxiosSecure = () => {
    return (
        axiosPrivate
    );
};

export default useAxiosSecure;