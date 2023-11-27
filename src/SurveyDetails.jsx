import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "./hook/useAxios";
import useGetRole from "./hook/useGetRole";
import { Button,  Radio } from 'antd';

import useServeyDetails from "./hook/useServeyDetails";
function isTodayBetween(endDate) {
  const today = new Date();
  const checkDateTime = today.getTime();
  const endDateTime = new Date(endDate).getTime();
  console.log( endDate, today);
  return checkDateTime >= endDateTime;
}
const SurveyDetails = () => {
  const params = useParams();
  const userRole = useGetRole();
  const [surveyData, loading, refetch] = useServeyDetails(params);
  // useEffect(() => {
  //   const fetchSurveyDetails = async () => {
  //     try {
  //       console.log(params._id);
  //       const response = await axios(`/serveyById/${params._id}`);
  //       setSurveyData(response.data);
  //     } catch (error) {
  //       console.error("Error fetching survey details:", error);
  //     }
  //   };
  //   fetchSurveyDetails();
  // }, [params, axios]);

  const handleVote = (voteOption) => {
    console.log(`User voted: ${voteOption}`);
  };

  const handleComment = (commentText) => {
    console.log(`User commented: ${commentText}`);
  };

  if (loading) return <></>;
  console.log(surveyData);
  return (
    <div>
      <h1>{surveyData.title}</h1>
      <p>Survey by: {surveyData.name}</p>
      <p>{surveyData.description}</p>
      {isTodayBetween(surveyData.date) ? (
        <div>
          <form onSubmit={handleVote}>
            <Radio.Group name="radiogroup" defaultValue={-1}>
              <Radio value={1}>YES</Radio>
              <Radio value={2}>No</Radio>
            </Radio.Group>
            <button
              type="submit"
              disabled={userRole != "" && userRole != "Survyor"}
            >
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div>Total vote: {surveyData.voteYes + surveyData.voteNo}</div>
      )}

      {userRole == "ProUser" && (
        <div>
          <textarea placeholder="Add a comment..." />
          <button onClick={() => handleComment("Comment text")}>
            Add Comment
          </button>
        </div>
      )}

      {/* {today>= surveyData.data[1] && (
        <div>
          <h2>Survey Results</h2>
        </div>
        )} */}

      <div>
        <p className="text-2xl font-bold">Comment</p>
        {surveyData?.comment?.map((comment, index) => (
          <div key={index}>
            <p>{comment.user}</p>
            <p>{comment}</p>
          </div>
        ))}
        <div className="flex">
            <input type="text" placeholder="Write Your comment" className="input input-bordered w-full max-w-xs" />
            <button className="btn" disabled={userRole!="prouser"}>POST</button>
        </div>
      </div>
      <p className="text-2xl font-bold">FeadBack</p>
      <div className="flex mx-5 space-x-5">
        <button className="btn" disabled={userRole == ""}>
          Like
        </button>
        <button className="btn" disabled={userRole == ""}>
          Dislike
        </button>
        <div
          className="tooltip tooltip-bottom"
          data-tip="Report this survey for inappropriate content"
        >
          <button className="btn" disabled={userRole == ""}>
            Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default SurveyDetails;
