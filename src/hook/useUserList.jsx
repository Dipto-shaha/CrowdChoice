import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useUserList = () => {
    const axios= useAxios()
    const {data:userList =[],isPending:loading,refetch} = useQuery({
        queryKey:['userList'],
        queryFn: async()=>{
            const res = await axios.get('/userList');
            console.log("What is wrong in this",res.data);
            return res.data;
        }
    })
    return [userList,loading,refetch];

};

export default useUserList;