import Survey from "./Survey";
import useServeyPost from "./hook/useServeyPost";
function isPrevious(endDate) {
    const today = new Date();
    const checkDateTime = today.getTime();
    const endDateTime = new Date(endDate).getTime();
    console.log( endDate, today);
    return checkDateTime > endDateTime;
  }
const FeaturedSurvey = () => {
    const [serveyList,loading]=useServeyPost();
    if(loading) return <></>;
    const mostvoted = serveyList.filter(survey=> isPrevious(survey.date));
    const recent = serveyList.filter(survey=> !isPrevious(survey.date));
    console.log(serveyList,mostvoted,recent)
    return (
        <>
            <div>
                <p className="text-3xl font-bold my-10 text-center">Most Voted Survey</p>
                    <div className=" grid grid-cols-3 gap-10">
                    {
                        mostvoted.slice(0,6).map(survey=> <Survey key={survey._id} survey={survey}></Survey>)
                    }
                </div>
            </div>
            <div>
                <p className="text-3xl font-bold my-10 text-center">Latest Survey</p>
                    <div className=" grid grid-cols-3 gap-10">
                    {
                        recent.slice(0,6).map(survey=> <Survey key={survey._id} survey={survey}></Survey>)
                    }
                </div>
            </div>
        </>

    );
};

export default FeaturedSurvey;