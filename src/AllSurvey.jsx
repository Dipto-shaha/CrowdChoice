import { useState } from "react";
import Survey from "./Survey";
import useServeyPost from "./hook/useServeyPost";

const AllSurvey = () => {
  const [serveyList, loading] = useServeyPost("True");
  const [searchTitle, setSearchTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [voteOrder, setVoteOrder] = useState("3");

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
        <span className=" text-7xl loading loading-bars loading-lg "></span>
      </div>
    );
  }

  const filteredSurveys = serveyList
    .filter((survey) =>
      selectedCategory === "all" ? true : survey.Category === selectedCategory
    )
    .filter((survey) =>
      searchTitle
        ? survey.title.toLowerCase().includes(searchTitle.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (voteOrder == "most") {
        return b.voteYes+b.voteNo - a.voteYes- a.voteNo;
      } else if (voteOrder == "low") {
        return a.voteYes+ a.voteNo - b.voteYes-b.voteNo ;
      } else {
        return Math.random() - 0.5;
      }
    });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
  };
  const handlesetVoteOrder=(item)=>{
      setVoteOrder(item);
  };

  return (
    <div>
      <p className="text-3xl font-bold my-10 text-center">Survey</p>
      <div className="flex mt-10 mb-20 lg:flex-row flex-col rounded items-center justify-center border bg-[#f0f7ff] py-2">
        <div className="lg:w-1/4 flex flex-col justify-center items-center">
          <label
            htmlFor="category"
            className="text-xl font-bold p-2"
          >
            Filter by Category
          </label>
          <select
            id="category"
            className="text-xl font-bold border-2 p-2"
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={selectedCategory}
          >
            <option value="all">All</option>
            <option value="Environment">Environment</option>
            <option value="Politics">Politics</option>
            <option value="Community Engagement">Community Engagement</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Teach">Teach</option>
          </select>
        </div>
        <div className="lg:w-1/2">
          <p className="text-2xl font-bold mx-auto p-2 w-full text-center"> Search By Title</p>
          <input
            type="text"
            id="searchTitle"
            value={searchTitle}
            className="w-full border-2  p-2"
            placeholder="Search Survey Title"
            onChange={handleSearchTitleChange}
          />
        </div>
        <div className="lg:w-1/4 flex flex-col justify-center items-center" >
          <label
            htmlFor="vote"
            className="text-xl font-bold  p-2 "
          >
            Filter by Vote
          </label>
          <select
            id="vote"
            className="text-xl font-bold  p-2"
            onChange={(e) => handlesetVoteOrder(e.target.value)}
            value={voteOrder}
          >
            <option value="3">Random</option>
            <option value="most">Most Vote</option>
            <option value="low">Low Vote</option>
          </select>
        </div>
      </div>
      <div className="grid lg:grid-cols-3  grid-cols-1 lg:gap-10 gap-5">
        {filteredSurveys.map((survey) => (
          <Survey key={survey._id} survey={survey}></Survey>
        ))}
      </div>
    </div>
  );
};

export default AllSurvey;
