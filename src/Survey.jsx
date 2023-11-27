import PropTypes from "prop-types";
import { Link } from "react-router-dom";
const Survey = ({ survey }) => {
  return (
    <div className="p-4 bg-[#f0f7ff] rounded-lg">
      <p>{survey.title} </p>
      <p>{survey.description}</p>
      <div className="mt-5 flex justify-between">
        <p className=" font-bold ">Total vote: {survey.voteYes + survey.voteNo}</p>
        <Link to={`/surveyDetails/${survey._id}`}>
          <button className="btn bg-[#ff715b] text-[#FFF]">Details</button>
        </Link>
      </div>
    </div>
  );
};

Survey.propTypes = {
  survey: PropTypes.object,
};
export default Survey;
