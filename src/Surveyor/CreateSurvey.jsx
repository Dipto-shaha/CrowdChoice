import { DatePicker } from "antd";
import { useContext, useState } from "react";
import { AuthContest } from "../Context";
import { toast } from "react-toastify";
import useAxios from "../hook/useAxios";
const CreateSurvey = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContest);
  const [startDate, setStartDate] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const handleSubmit = (e) => {
    e.preventDefault();
    if( startDate < today)
    {
        toast.error("Sart Date can not past date ");
        return;
    }
    const form = new FormData(e.currentTarget);
    console.log(form);
    const email = user?.email;
    const title = form.get("title");
    const Category = form.get("Category");
    const description = form.get("description");
    const question= form.get("question");
    const surveyPost = {
      name: user.displayName,
      email,
      title,
      Category,
      description,
      question,
      date:startDate,
    };
    console.log(surveyPost);
    axios.post("/createSurvey", surveyPost).then((res) => {
      console.log(res.data);
      toast.success("Survey Post Created Successfully");
    });
  };
  return (
    <div className="bg-[#f0f7ff] mx-5 lg:mx-20 my-10 lg:p-20 p-5">
      <p className="text-3xl font-bold my-5 text-center">Create a Servey</p>
      <div className="space-y-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label className="text-xl font-medium ">Survey Title</label>
            <input
              type="text"
              name="title"
              required
              placeholder="Type here"
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
              placeholder="Survey Description"
            ></textarea>
          </div>
          <div>
            <label className="text-xl font-medium">Survey Question</label>
            <input
              type="text"
              required
              name="question"
              placeholder="Enter your Question (Option will be YES or NO)"
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
              <select className="rounded-lg p-2" name="Category" required>
                <option value="" disabled selected>
                  Select a Category
                </option>
                <option value="Environment">Environment</option>
                <option value="Politics">Politics</option>
                <option value="Community Engagement">
                  Community Engagement
                </option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
                <option value="Teach">Teach</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center items-center my-10">
            <button className="btn bg-[#ff715b]">
                Create Servey
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSurvey;
