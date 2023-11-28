import { useEffect, useState } from "react";
import Survey from "./Survey";
import useServeyPost from "./hook/useServeyPost";
function isPrevious(endDate) {
  const today = new Date();
  const checkDateTime = today.getTime();
  const endDateTime = new Date(endDate).getTime();
  //console.log(endDate, today);
  return checkDateTime > endDateTime;
}
const FeaturedSurvey = () => {
  const [serveyList,loading] = useServeyPost("True");
  const [mostvoted, setmostvoted] = useState([]);
  const [load, setLoad] = useState(true);
  const [recent, setRecent] = useState([]);
  useEffect(() => {
    if(loading )return;
    const data = serveyList.filter((survey) => isPrevious(survey.date));
    setmostvoted(data);
    const recentData = serveyList.filter((survey) => !isPrevious(survey.date));
    setRecent(recentData);
    setLoad(false);
  }, [serveyList,loading]);
  if (load)
    return (
      <div className="flex h-screen justify-center items-center">
        <span className="loading loading-bars loading-md"></span>
        <span className=" text-7xl loading loading-bars loading-lg "></span>
      </div>
  );
  console.log(serveyList, mostvoted, recent);
  return (
    <>
      <div>
        <p className="text-3xl font-bold my-10 text-center">
          Most Voted Survey
        </p>
        <div className=" grid grid-cols-1  lg:grid-cols-3 gap-10">
          {mostvoted.slice(0, 6).map((survey) => (
            <Survey key={survey._id} survey={survey}></Survey>
          ))}
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold my-10 text-center">Latest Survey</p>
        <div className=" grid grid-cols-1  lg:grid-cols-3 gap-10">
          {recent.slice(0, 6).map((survey) => (
            <Survey key={survey._id} survey={survey}></Survey>
          ))}
        </div>
      </div>
    </>
  );
};

export default FeaturedSurvey;
