import Survey from "./Survey";
import useServeyPost from "./hook/useServeyPost";

const FeaturedSurvey = () => {
    const [serveyList]=useServeyPost();
    return (
        <>
            <p>Featured Survey</p>
            <div className=" grid grid-cols-3 ">
                {
                    serveyList.map(survey=><Survey key={survey._id} survey={survey}></Survey>)
                }
            </div>
        </>
    );
};

export default FeaturedSurvey;