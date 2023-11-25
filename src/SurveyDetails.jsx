import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import useAxios from "./hook/useAxios";
import { AuthContest } from "./Context";
import useGetRole from "./hook/useGetRole";
const SurveyDetails = () => {
  const [surveyData, setSurveyData] = useState({});
  const params = useParams();
  const axios = useAxios();
  const userRole= useGetRole();
  const today = new Date();
  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        console.log(params._id);
        const response = await axios(`/serveyById/${params._id}`);
        setSurveyData(response.data);
      } catch (error) {
        console.error("Error fetching survey details:", error);
      }
    };
    fetchSurveyDetails();
  }, [params, axios]);

  //  // Check user's authorization and survey status
  //   useEffect(() => {
  //     // Simulated logic, replace with your actual authentication and authorization checks
  //     const userIsAuthenticated = true; // Replace with actual authentication check
  //     const userIsProUser = true; // Replace with actual check for pro user status
  //     const surveyDeadline = new Date(surveyData.date[1].$date); // Replace with actual survey deadline

  //     setUserCanVote(userIsAuthenticated && !isDeadlinePassed);
  //     setUserCanComment(userIsAuthenticated && userIsProUser && !isDeadlinePassed);
  //     setIsDeadlinePassed(new Date() > surveyDeadline);
  //   }, [surveyData]);

  // Handle voting logic
  const handleVote = (voteOption) => {
    console.log(`User voted: ${voteOption}`);
  };

  // Handle commenting logic
  const handleComment = (commentText) => {
    // Simulated logic, replace with actual API call to submit comment
    console.log(`User commented: ${commentText}`);
  };

  // Render the component
  return (
    <div>
      <h1>{surveyData.title}</h1>
      <p>{surveyData.description}</p>
      <p>Survey by: {surveyData.name}</p>

        <div>
            <button onClick={() => handleVote('Yes')} disabled={userRole !="" && userRole!="Survyor"}>Vote Yes</button>
            <button onClick={() => handleVote('No')} disabled={userRole !="" && userRole!="Survyor"}>Vote No</button>
        </div>

      { userRole=="ProUser" && (
        <div>
          <textarea placeholder="Add a comment..." />
          <button onClick={() => handleComment('Comment text')}>Add Comment</button>
        </div>
      )}

      {/* {today>= surveyData.data[1] && (
        <div>
          <h2>Survey Results</h2>
        </div>
        )} */}

      <div>
        {surveyData?.comment?.map((comment, index) => (
          <div key={index}>
            <p>{comment.user}</p>
            <p>{comment}</p>
          </div>
        ))}
      </div>
      <div className="flex mx-5">
        <button disabled={userRole}>Like</button>
        <button disabled={userRole}>Dislike</button>
        <button disabled={userRole}>Report</button>
      </div>
    </div>
  );
};

export default SurveyDetails;
