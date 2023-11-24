import axios from 'axios';

const axiosPublic = axios.create({
    baseURL:'https:localhost'
})
const useAxios = ()=>{
    return axiosPublic;
}
export default useAxios;