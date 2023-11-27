import Survey from "./Survey";
import useServeyPost from "./hook/useServeyPost";
const AllSurvey = () => {
  const [serveyList, loading] = useServeyPost();
  if (loading) return <></>;
  return (
    <div>
      <p className="text-3xl font-bold my-10 text-center"> Survey</p>
      <div className="flex">
        <div className="w-1/6">
            
        </div>
        <div className="w-5/6 grid grid-cols-3 gap-10">
            {serveyList.map((survey) => (
            <Survey key={survey._id} survey={survey}></Survey>
            ))}
        </div>
        </div>
    </div>
  );
};

export default AllSurvey;
