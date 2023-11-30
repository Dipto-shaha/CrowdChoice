import axios from 'axios';

const axiosPublic = axios.create({
    baseURL:'https://crowd-choice-backend.vercel.app'
})
const useAxios = ()=>{
    return axiosPublic;
}
export default useAxios;