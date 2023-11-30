import useAxios from "../hook/useAxios";
import useServeyPost from "../hook/useServeyPost";
import formatDate from "../utlity/timeFormate";
import { useContext } from "react";
import { AuthContest } from "../Context";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SurveyList = () => {
  const [serveyList, loading] = useServeyPost();
  const { user } = useContext(AuthContest);
  const list = serveyList.filter((item) => item.email == user.email);
  const axios = useAxios();
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
        <span className=" text-7xl loading loading-bars loading-lg "></span>
      </div>
    );
  }
  const handleFeedback = async (_id, email) => {
    console.log(_id, email);
    document.getElementById(`my_modal_5${_id}`).showModal();
    const info = { surveyorEmail: email, SurveyId: _id };
    const result = await axios.post("/surveyFeedback", info);
    console.log(result);
    document.getElementById(`my_modal_5${_id}`).innerText = result.data.message;
  };
  const surveyFeedback = async (_id) => {
    console.log(_id);
    document.getElementById(`feedback${_id}`).showModal();
    const result = await axios.get(`/userfeedback/${_id}`);
    console.log(result.data);
    if (result.data == "")
      document.getElementById(`userfeedback${_id}`).innerText =
        "No Feedback yet";
    else {
      console.log(result.data.message)
      // document.getElementById(`userfeedback${_id}`).innerText = Object.values(result.data)
      // .map((item) => item.message)
      // .join(" ");
      document.getElementById(`userfeedback${_id}`).innerText =result.data.message;
    }
    console.log(result);
  };
  return (
    <>
      <div className="overflow-x-auto overflow-y-hidden">
        <p className="text-3xl font-bold text-center my-5">Servey List</p>
        <table className="table border border-[#7ec6d5] rounded-xl">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Email</th>
              <th>Deadline</th>
              <th>Yes</th>
              <th>No</th>
              <th>TotalVote</th>
              <th>User Feedback</th>
              <th>Status</th>
            </tr>
          </thead>
          {!loading && (
            <tbody>
              {list.map((item, index) => {
                return (
                  <tr className="hover" key={item._id}>
                    <td>{index + 1}</td>
                    <td>{item.title}</td>
                    <td>{item.email}</td>
                    <td>{formatDate(item.date)}</td>
                    <td>{item.voteYes}</td>
                    <td>{item.voteNo}</td>
                    <td>{item.voteYes + item.voteNo}</td>
                    <td>
                      <button
                        className="btn bg-[#f29391] "
                        onClick={() => surveyFeedback(item._id)}
                      >
                        Show
                        <dialog
                          id={`feedback${item._id}`}
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box">
                            <h3 className="font-bold text-lg">
                              User Feedback
                            </h3>
                            <p
                              id={`userfeedback${item._id}`}
                              className="text-xl mt-5"
                            ></p>
                            <div className="modal-action">
                              <form method="dialog">
                                <button className="btn">Close</button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </button>
                    </td>
                    <td>
                      {item.publish_status ? (
                        <>
                          {"Published"}{" "}
                          <Link
                            className="btn  ml-5 px-6 bg-[#9cf8a2]"
                            to={`/survyor/updateSurvey/${item._id}`}
                          >
                            Update
                          </Link>
                        </>
                      ) : (
                        <>
                          {"Unpublished"}
                          <button
                            className="btn bg-[#7ec6d5] ml-2 "
                            onClick={() => handleFeedback(item._id, item.email)}
                          >
                            Feedback
                          </button>
                          <dialog
                            id={`my_modal_5${item._id}`}
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <div className="modal-box">
                              <h3 className="font-bold text-lg">
                                Admin Feedback
                              </h3>
                              <p
                                id={`feedback${item._id}`}
                                className="text-xl mt-5"
                              ></p>
                              <div className="modal-action">
                                <form method="dialog">
                                  <button className="btn">Close</button>
                                </form>
                              </div>
                            </div>
                          </dialog>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>
      </div>
      <div className="w-full lg:h-80 mt-5">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={serveyList}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={serveyList.id++} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="voteYes"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="voteNo"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default SurveyList;
