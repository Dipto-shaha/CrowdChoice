import { toast } from "react-toastify";
import useAxios from "../hook/useAxios";
import useServeyPost from "../hook/useServeyPost";

const SurveyPublish = () => {
  const [serveyList, loading, refetch] = useServeyPost();
  const axios = useAxios();
  const handleSurvey = async (e, _id,email) => {
    e.preventDefault();
    const feedbackMessage = e.target.message.value;
    console.log(_id, feedbackMessage);
    try {
      const res = await axios.patch('/serveyUpdateStatus', { _id, feedbackMessage,email });
      console.log(res);
      const myModal = document.getElementById(`my_modal_${_id}`);
      refetch();
      myModal.close();
      toast.success("Survey Published Staus Updated Sucessfully");
    } catch (error) {
      console.error('Error updating survey status:', error);
      toast.error("Something wrong try again");
    }
  };
  return (
    <div className="overflow-x-auto overflow-y-hidden">
      <table className="table border border-[#7ec6d5] rounded-xl">
        {/* head */}
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Email</th>
            <th>TotalVote</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        {!loading && (
          <tbody>
            {serveyList.map((item, index) => {
              return (
                <tr className="hover" key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.email}</td>
                  <td>{item.voteYes + item.voteNo}</td>
                  <td>{item.publish_status ? "Published" : "Unpublished"}</td>
                  <td>
                    {item.publish_status && (
                      <button
                        className="btn"
                        onClick={() =>
                          document.getElementById(`my_modal_${item._id}`).showModal()
                        }
                      >
                        UnPublish
                      </button>
                    )}
                     <dialog
                    id={`my_modal_${item._id}`}
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <div className="modal-box">
                      <form onSubmit={(e) => handleSurvey(e, item._id,item.email)}>
                        <div>Feedback Message</div>
                        <input
                          type="text"
                          name="message"
                          placeholder="Write Feedback message"
                          className="input input-bordered input-primary w-full max-w-xs mr-2 mt-5"
                        />
                        <button type="submit" className="btn">
                          Submit
                        </button>
                      </form>

                      <div className="modal-action">
                        <form method="dialog">
                          <button className="btn" >Close</button>
                        </form>
                      </div>
                    </div>
                    </dialog>
                  </td>
                 
                </tr>
              );
            })}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default SurveyPublish;
