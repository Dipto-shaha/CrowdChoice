import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import useAxios from "./useAxios";
const useServeyPost = ( flag  ) => {
    const axios= useAxios()
    const {data:serveyList =[],isPending:loading,refetch} = useQuery({
        queryKey:['serveyList'],
        queryFn: async()=>{
            console.log("Flag is ",flag)
            let url;
            if(flag)
                url = `/serveyList/?publish_status=${flag}`;
            else url= `/serveyList`;
            const res = await axios.get(url);
            //console.log("What is wrong in this",res.data);
            return res.data;
        }
    })
    return [serveyList,loading,refetch];
};
useServeyPost.propTypes = {
    flag: PropTypes.bool,
  };

export default useServeyPost;


