import { Button } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
const Survey = ({survey}) => {
    return (
        <div>
            <p>{survey.title} </p>
            <p>{survey.description}</p>
            <p>Total vote:{survey.voteYes+survey.voteNo}</p>
            <Link to={`/surveyDetails/${survey._id}`}><Button>Details</Button></Link>
        </div>
    );
};



Survey.propTypes = {
    survey: PropTypes.object
  };
export default Survey;