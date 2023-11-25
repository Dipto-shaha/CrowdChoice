import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
const useServeyPost = () => {
    const axios= useAxios()
    const {data:serveyList =[],isPending:loading,refetch} = useQuery({
        queryKey:['serveyList'],
        queryFn: async()=>{
            const res = await axios.get('/serveyList/?publish_status==true');
            console.log("What is wrong in this",res.data);
            return res.data;
        }
    })
    return [serveyList,loading,refetch];
};

export default useServeyPost;


