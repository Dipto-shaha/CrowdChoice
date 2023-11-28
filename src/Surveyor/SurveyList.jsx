import useAxios from "../hook/useAxios";
import useServeyPost from "../hook/useServeyPost";
import formatDate from "../utlity/timeFormate";
import { useContext } from "react";
import { AuthContest } from "../Context";
import { Link } from "react-router-dom";

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
  
  const handleFeedback = async(_id, email) =>{
    console.log(_id, email)
    document.getElementById(`my_modal_5${_id}`).showModal();
    const info= {surveyorEmail:email,SurveyId:_id};
    const result =await  axios.post('/surveyFeedback',info);
    console.log(result);
    document.getElementById(`feedback${_id}`).innerText = result.data.message;

  }
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
                      {item.publish_status ? (
                        <>{"Published"} <Link className="btn ml-8 px-6 bg-[#9cf8a2]" to={`/survyor/updateSurvey/${item._id}`}>Update</Link></>
                      ) : (
                        <>
                          {"Unpublished"} 
                          <button
                            className="btn bg-[#7ec6d5] ml-4"
                            onClick={() => handleFeedback(item._id, item.email)}
                          >
                            Feedback
                          </button>
                          <dialog
                            id={`my_modal_5${item._id}`}
                            className="modal modal-bottom sm:modal-middle"
                          >
                            <div className="modal-box">
                              <h3 className="font-bold text-lg">Admin Feedback</h3>
                              <p id={`feedback${item._id}`} className="text-xl mt-5"></p>
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
    </>
  );
};

export default SurveyList;
