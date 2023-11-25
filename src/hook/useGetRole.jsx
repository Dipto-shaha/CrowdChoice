import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import { useContext } from "react";
import { AuthContest } from "../Context";

const useGetRole = () => {
    const axios= useAxios();
    const {user}=useContext(AuthContest);
    const {data:userList =""} = useQuery({
        queryKey:['userRole'],
        queryFn: async()=>{
            if(!user)
                return "";
            const res = await axios.get(`/getUserRole?email=${user?.email}`);
            console.log("User Role is",res.data);
            return res.data;
        }
    })
    return userList;

};

export default useGetRole;