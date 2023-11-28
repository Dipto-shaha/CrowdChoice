import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
const useServeyDetails = (params) => {
    const axios= useAxios()
    const {data:surveyData =[],isPending:loading,refetch} = useQuery({
        queryKey:['serveyListDetails'],
        queryFn: async()=>{
            const res = await axios.get(`/serveyById/${params._id}`);
            return res.data;
        }
    })
    return [surveyData,loading,refetch];
};

export default useServeyDetails;


