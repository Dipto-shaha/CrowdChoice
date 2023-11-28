import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDate from "./utlity/timeFormate";
const Survey = ({ survey }) => {
  return (
    <div className="p-4 bg-[#f0f7ff] rounded-lg">
      <p className="text-center font-semibold text-2xl my-5">{survey.title} </p>
      <p className="font-bold bg-[#bcd1f7] rounded-lg py-1 mb-3 px-2 inline" >{survey.Category}</p>
      <p className="mt-3">{survey.description}</p>
      <p className="mb-3">Deadline: {formatDate(survey.date)}</p>
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
