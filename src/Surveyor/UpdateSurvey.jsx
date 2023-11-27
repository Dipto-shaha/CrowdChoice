import { DatePicker } from "antd";
import { useContext, useState } from "react";
import { AuthContest } from "../Context";
import { toast } from "react-toastify";
import useAxios from "../hook/useAxios";
import { useParams } from "react-router-dom";
import useServeyDetails from "../hook/useServeyDetails";
const UpdateSurvey = () => {
  const axios = useAxios();
  const params = useParams();
  const [surveyData, loading] = useServeyDetails(params);
  const { user } = useContext(AuthContest);
  const [startDate, setStartDate] = useState(new Date(surveyData.date));
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (startDate < today) {
      toast.error("Sart Date can not past date ");
      return;
    }
    const form = new FormData(e.currentTarget);
    console.log(form);
    const email = user?.email;
    const title = form.get("title");
    const Category = form.get("Category");
    const description = form.get("description");
    const question = form.get("question");

    const surveyUpdate = {
      name: user.displayName,
      email,
      title,
      Category,
      description,
      date: startDate,
      question,
    };
    console.log(surveyUpdate);
    axios.patch("/serveyUpdate", {_id:surveyData._id,surveyUpdate}).then((res) => {
      console.log(res.data);
      toast.success("Survey Post Created Successfully");
    });
  };
  if (loading) return <></>;
  return (
    <div className="bg-[#f0f7ff] mx-5 lg:mx-20 my-10 lg:p-20 p-5">
      <p className="text-3xl font-bold my-5 text-center">Update Servey</p>
      <div className="space-y-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-xl font-medium ">Survey Title</label>
            <input
              type="text"
              name="title"
              required
              defaultValue={surveyData.title}
              className="input input-bordered  w-full"
            />
          </div>
          <div className="my-5">
            <label className="text-xl font-medium ">Survey Description</label>
            <br />
            <textarea
              className="textarea w-full"
              required
              name="description"
              defaultValue={surveyData.description}
            ></textarea>
          </div>
          <div>
            <label className="text-xl font-medium">Survey Question</label>
            <input
              type="text"
              name="question"
              required
              defaultValue={surveyData.question}
              className="input input-bordered w-full"
            />
          </div>
          <div className="my-5 flex flex-col lg:flex-row justify-between lg:mr-20">
            <div>
              <label className="text-xl font-medium ">Servey Deadline </label>
              <DatePicker
                required
                selected={startDate}
                minDate={today}
                className="p-2"
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div>
              <label className="font-semibold text-lg mr-5">
                Category Name
              </label>
              <select
                className="rounded-lg p-2"
                defaultValue={surveyData.Category}
                name="Category"
                required
              >
                {<option value="Environment">Environment</option>}
                {surveyData.Category != "Politics" && (
                  <option value="Politics">Politics</option>
                )}
                {surveyData.Category != "Community Engagement" && (
                  <option value="Community Engagement">
                    Community Engagement
                  </option>
                )}
                {surveyData.Category != "Health" && (
                  <option value="Health">Health</option>
                )}
                {surveyData.Category != "Education" && (
                  <option value="Education">Education</option>
                )}
                {surveyData.Category != "Teach" && (
                  <option value="Teach">Teach</option>
                )}
              </select>
            </div>
          </div>
          <div className="flex justify-center items-center my-10">
            <button className="btn bg-[#ff715b]">Update Servey</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateSurvey;
