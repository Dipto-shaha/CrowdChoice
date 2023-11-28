import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useAxios from "./hook/useAxios";
import useGetRole from "./hook/useGetRole";
import { Radio } from "antd";
import { AiFillLike,AiFillDislike } from "react-icons/ai";

import useServeyDetails from "./hook/useServeyDetails";
import { toast } from "react-toastify";
import { AuthContest } from "./Context";
function isValid(endDate) {
  const today = new Date();
  const checkDateTime = today.getTime();
  const endDateTime = new Date(endDate).getTime();
  console.log(endDate, " Daadline is");
  return checkDateTime <= endDateTime;
}
const SurveyDetails = () => {
  const params = useParams();
  const userRole = useGetRole();
  const [voteDone,setVoteDone]=useState(true);
  const { user } = useContext(AuthContest);
  const [surveyData, loading, refetch] = useServeyDetails(params);
  const axios = useAxios();
  // const chartinfo = {
  //   labels: ["YES", "NO"],
  //   datasets: [
  //     {
  //       label: "Vote",
  //       backgroundColor: "rgba(75,192,192,0.4)",
  //       borderColor: "rgba(75,192,192,1)",
  //       borderWidth: 1,
  //       hoverBackgroundColor: "rgba(75,192,192,0.6)",
  //       hoverBorderColor: "rgba(75,192,192,1)",
  //       data: [surveyData.voteYes, surveyData.voteNo],
  //     },
  //   ],
  // };
  // const PIdata = {
  //   labels: ["Red", "Green", "Purple", "Orange"],
  //   datasets: [
  //     {
  //       data: [surveyData.voteNo, surveyData.voteYes],
  //       backgroundColor: ["#FF6384", "#2E7D32"],
  //       hoverBackgroundColor: ["#FF6384", "#2E7D32"],
  //     },
  //   ],
  // };
  useEffect(() => {
    const votedDoneOrNot = async () => {
      try {
        if (userRole == "user" || userRole == "prouser") 
            setVoteDone(false);
        const response = await axios(`/voterget?SurveyId=${surveyData._id}&voterEmail=${user.email}`);
        console.log("Hello", response.data);
        if(response?.data) 
          setVoteDone(true);
      } catch (error) {
        console.error("Error fetching voter List:", error);
      }
    };
    votedDoneOrNot();
  }, [user,surveyData, axios,userRole]);

  const handleLikedislike =async(flag)=>{
    let like =surveyData.like,dislike=surveyData.dislike;
    if(flag) like=like+1;
    else dislike=dislike+1;
    axios.patch("/serveyUpdate", { _id: surveyData._id, surveyUpdate:{like,dislike} })
    .then((res) => {
      console.log(res.data);
      refetch();
    });
  }
  const handleVote = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const vote = form.get("radiogroup");
    if (!vote) {
      toast.warning("Select a options");
      return;
    }
    let voteYes=surveyData.voteYes, voteNo=surveyData.voteNo;
    if (vote == 1) voteYes = voteYes + 1;
    else voteNo = voteNo + 1;
    axios
      .patch("/serveyUpdate", { _id: surveyData._id, surveyUpdate:{voteYes,voteNo} })
      .then((res) => {
        console.log(res.data);
        refetch();
        toast.success("Participated Successfully");
      });
    console.log(`User voted: ${vote}`);
    try {
      const voteradd = axios.post("/voterAdd", {
        SurveyId: surveyData._id,
        voterEmail: user.email,
      });
      console.log(voteradd);
    } catch (error) {
      console.log(error);
    }
    
  };

  const handleComment = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const comment = form.get("comment");
  
    console.log(`User commented: ${comment}`);
    axios
      .patch("/commentAdd", {
        _id: surveyData._id,
        comment: { name: user.displayName, text: comment },
      })
      .then((res) => {
        console.log(res.data);
        toast.success("Comment Added Successfully");
        refetch();
        console.log(surveyData.comment);
      });
      e.target.reset()
  };

  if (loading) return <></>;
  console.log(surveyData);
  return (
    <div className="bg-[#f0f7ff] lg:mx-20 mx-10 mt-5 lg:mt-10 rounded-2xl lg:p-10 space-y-2">
      <h1 className="text-3xl text-center   font-bold">{surveyData.title}</h1>
      <p className="font-bold bg-[#a6bff9] rounded-lg py-1 px-2 inline">
        {surveyData.Category}
      </p>
      <p className="text-xl font-medium">Surveyor Name: {surveyData.name}</p>
      <p>{surveyData.description}</p>
      <p className="font-bold">Questons</p>
      <p>{surveyData.question}</p>
      {isValid(surveyData.date) ? (
        <div>
          <form onSubmit={handleVote}>
            <Radio.Group name="radiogroup" required>
              <Radio value={1}>YES</Radio>
              <Radio value={2}>No</Radio>
            </Radio.Group>
            <button
              type="submit"
              className="btn bg-[#ff715b]"
              disabled={ voteDone}
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <>
          <div>Total vote: {surveyData.voteYes + surveyData.voteNo}</div>
        </>
      )}

      <div>
        <div className="flex text-3xl">
          <div className="flex border-2 border-[#7ec6d5] p-2 mr-2 rounded-md"> {surveyData.like} <AiFillLike /></div>
          <div className="flex border-2 border-[#7ec6d5] p-2 rounded-md"> {surveyData.dislike}<AiFillDislike /></div>
        </div>
        <p className="text-2xl font-bold">Comment</p>
        <div className="grid grid-cols-1 gap-5 my-5">
          {surveyData?.comment?.map((item) => (
            <div
              key={item._id}
              className="bg-[#a6bcf2]  w-fit px-4 py-2 rounded-3xl"
            >
              <p className="text-sm font-extrabold ">{item.name}</p>
              <p className="text-xl">{item.text}</p>
            </div>
          ))}
        </div>

        {userRole == "prouser" && (
          <div className="join">
            <form onSubmit={handleComment}>
              <input
                className="input input-bordered join-item"
                placeholder="Add a comment..."
                name="comment"
                required
              />
              <button className="btn join-item rounded-r-full  bg-[#ff715b]">
                Add Comment
              </button>
            </form>
          </div>
        )}
      </div>
      <p className="text-2xl font-bold">FeadBack</p>
      <div className="flex mx-5 space-x-5">
        <button className="btn bg-[#ff715b]" onClick={()=>handleLikedislike(true)}  disabled={userRole == ""}>
          Like
        </button>
        <button className="btn bg-[#ff715b]" onClick={()=>handleLikedislike(false) } disabled={userRole == ""}>
          Dislike
        </button>
        <div
          className="tooltip tooltip-bottom " 
          data-tip="Report this survey for inappropriate content"
        >
          <button className="btn bg-[#ff715b]" disabled={userRole == ""}>
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
