import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { AuthContest } from "../Context";

const useGetRole = () => {
    const axios= useAxios();
    const {user}=useContext(AuthContest);
    const {data:userRole =""} = useQuery({
        queryKey:['userRole'],
        queryFn: async()=>{
            if(!user)
                return "";
            const res = await axios.get(`/getUserRole?email=${user?.email}`);
            console.log("User Role is",res.data.role);
            return res.data.role;
        }
    })
    return userRole;

};

export default useGetRole;