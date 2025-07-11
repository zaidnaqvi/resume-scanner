import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">Job Details</h1>
      <p className="text-gray-600">Showing details for Job ID: {id}</p>
    </div>
  );
};

export default JobDetails;
