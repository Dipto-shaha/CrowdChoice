import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useAxios from "./hook/useAxios";
import { Radio } from "antd";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import { BarChart, Bar, XAxis, YAxis, Legend } from "recharts";

import useServeyDetails from "./hook/useServeyDetails";
import { toast } from "react-toastify";
import { AuthContest } from "./Context";
import formatDate from "./utlity/timeFormate";
function isValid(endDate) {
  const today = new Date();
  const checkDateTime = today.getTime();
  const endDateTime = new Date(endDate).getTime();
  console.log(endDate, " Daadline is");
  return checkDateTime <= endDateTime;
}
const SurveyDetails = () => {
  const params = useParams();
  const [voteDone, setVoteDone] = useState(true);
  const { user ,userRole} = useContext(AuthContest);
  const [surveyData, loading, refetch] = useServeyDetails(params);
  const axios = useAxios();
  const data = [
    { name: "YES", value: surveyData.voteYes },
    { name: "No", value: surveyData.voteNo },
  ];
  const COLORS = ["#FF6384", "#36A2EB"];

  useEffect(() => {
    const votedDoneOrNot = async () => {
      try {
        if (userRole == "user" || userRole == "prouser") setVoteDone(false);
        const response = await axios(
          `/voterget?SurveyId=${surveyData._id}&voterEmail=${user.email}`
        );
        console.log("Hello", response.data);
        if (response?.data) setVoteDone(true);
      } catch (error) {
        console.error("Error fetching voter List:", error);
      }
    };
    votedDoneOrNot();
  }, [user, surveyData, axios, userRole]);

  const handleLikedislike = async (flag) => {
    let like = surveyData.like,
      dislike = surveyData.dislike;
    if (flag) like = like + 1;
    else dislike = dislike + 1;
    axios
      .patch("/serveyUpdate", {
        _id: surveyData._id,
        surveyUpdate: { like, dislike },
      })
      .then((res) => {
        console.log(res.data);
        refetch();
      });
  };
  const handleVote = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const vote = form.get("radiogroup");
    if (!vote) {
      toast.warning("Select a options");
      return;
    }
    let voteYes = surveyData.voteYes,
      voteNo = surveyData.voteNo;
    if (vote == 1) voteYes = voteYes + 1;
    else voteNo = voteNo + 1;
    axios
      .patch("/serveyUpdate", {
        _id: surveyData._id,
        surveyUpdate: { voteYes, voteNo },
      })
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
    e.target.reset();
  };

  if (loading) return <></>;
  console.log(surveyData);
  return (
    <div className="bg-[#f0f7ff] lg:mx-20 mx-5 mt-5 lg:mt-10 rounded-2xl lg:p-10 p-4 space-y-2">
      <h1 className="text-3xl text-center   font-bold">{surveyData.title}</h1>
      <p className="font-bold bg-[#a6bff9] rounded-lg py-1 px-2 inline">
        {surveyData.Category}
      </p>
      <p className="text-xl font-medium">Surveyor Name: {surveyData.name}</p>
      <p className="mb-3">Deadline: {formatDate(surveyData.date)}</p>
      <p>{surveyData.description}</p>
      <p className="font-bold">Questons</p>
      <p>{surveyData.question}</p>
      <div className="flex lg:flex-row flex-col space-y-5">
        <div className="flex-grow">
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
                  disabled={voteDone}
                >
                  Submit
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="font-semibold text-3xl mt-5">Total vote: {surveyData.voteYes + surveyData.voteNo}</div>
            </>
          )}

          <div className="mt-5">
            <div className="flex text-3xl">
              <div className="flex border-2 border-[#7ec6d5] p-2 mr-2 rounded-md">
                {surveyData.like} <AiFillLike />
              </div>
              <div className="flex border-2 border-[#7ec6d5] p-2 rounded-md">
                {surveyData.dislike}
                <AiFillDislike />
              </div>
            </div>
            <p className="text-2xl my-5 font-bold">Comment</p>
            <div className="grid grid-cols-1 gap-5">
              {surveyData?.comment?.map((item) => (
                <div
                  key={item._id}
                  className="bg-[#a6bcf2]  w-fit px-4 rounded-3xl"
                >
                  <p className="text-sm font-extrabold ">{item.name}</p>
                  <p className="text-xl">{item.text}</p>
                </div>
              ))}
            </div>

            {  (
              <div className="join">
                <form onSubmit={handleComment}>
                  <input
                    className="input input-bordered join-item"
                    placeholder="Add a comment..."
                    name="comment"
                    required
                  />
                  <button className="btn join-item rounded-r-full mt-5  bg-[#ff715b]" disabled={userRole != "prouser"}>
                    Add Comment
                  </button>
                </form>
              </div>
            )}
          </div>
          <p className="text-2xl font-bold my-5">FeadBack</p>
          <div className="flex  space-x-5">
            <button
              className="btn bg-[#ff715b]"
              onClick={() => handleLikedislike(true)}
              disabled={userRole == "" || userRole =="admin" || userRole=="surveyor"}
            >
              Like
            </button>
            <button
              className="btn bg-[#ff715b]"
              onClick={() => handleLikedislike(false)}
              disabled={userRole == "" || userRole =="admin" || userRole=="surveyor"}
            >
              Dislike
            </button>
            <div
              className="tooltip tooltip-bottom "
              data-tip="Report this survey for inappropriate content"
            >
              <button className="btn bg-[#ff715b]" disabled={userRole == "" || userRole =="admin" || userRole=="surveyor"}>
                Report
              </button>
            </div>
          </div>
        </div>
        {!isValid(surveyData.date) && (
          <div className="flex flex-col">
            <p className="text-3xl font-extrabold text-center">Result</p>
            <PieChart width={400} height={300}>
              <Pie
                data={data}
                cx={200}
                cy={150}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <BarChart width={400} height={300} data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        )}
      </div>
    </div>
  );
};

export default SurveyDetails;
