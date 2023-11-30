import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUserList = () => {
    const axiosPrivate= useAxiosSecure()
    const {data:userList =[],isPending:loading,refetch} = useQuery({
        queryKey:['userList'],
        queryFn: async()=>{
            const res = await axiosPrivate.get('/userList');
            console.log("What is wrong in this",res.data);
            return res.data;
        }
    })
    return [userList,loading,refetch];

};

export default useUserList;