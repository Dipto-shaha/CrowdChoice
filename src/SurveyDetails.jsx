import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxios from "./hook/useAxios";
import useGetRole from "./hook/useGetRole";
import { Radio } from "antd";
import { Bar, Pie } from 'react-chartjs-2';


import useServeyDetails from "./hook/useServeyDetails";
function isValid(endDate) {
  const today = new Date();
  const checkDateTime = today.getTime();
  const endDateTime = new Date(endDate).getTime();
  console.log(endDate ," Daadline is");
  return checkDateTime <= endDateTime;
}
const SurveyDetails = () => {
  const params = useParams();
  const userRole = useGetRole();
  const [surveyData, loading] = useServeyDetails(params);
  const chartinfo = {
    labels: ['YES', 'NO'],
    datasets: [
      {
        label: 'Vote',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [surveyData.voteYes,surveyData.voteNo]
      },
    ],
  }
  const PIdata = {
    labels: ['Red',  'Green', 'Purple', 'Orange'],
    datasets: [
      {
        data: [surveyData.voteNo,surveyData.voteYes,],
        backgroundColor: [
          '#FF6384',
          '#2E7D32'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#2E7D32'
        ],
      },
    ],
  };
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
    <div className="bg-[#f0f7ff] lg:mx-20 mx-10 mt-5 lg:mt-10 rounded-2xl lg:p-10 space-y-2">
      <h1 className="text-3xl text-center   font-bold">{surveyData.title}</h1>
      <p className="font-bold bg-[#a6bff9] rounded-lg py-1 px-2 inline" >{surveyData.Category}</p>
      <p className="text-xl font-medium">Surveyor Name: {surveyData.name}</p>
      <p>{surveyData.description}</p>
      <p className="font-bold">Questons</p>
      <p>{surveyData.question}</p>
      {isValid(surveyData.date) ? (
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
      ) : (<>
        <div>Total vote: {surveyData.voteYes + surveyData.voteNo}</div>
        <Bar data={chartinfo} />
        <Pie data={PIdata} />
        </>
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
          <input
            type="text"
            placeholder="Write Your comment"
            className="input input-bordered w-full max-w-xs"
          />
          <button className="btn" disabled={userRole != "prouser"}>
            POST
          </button>
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
