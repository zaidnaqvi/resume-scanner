import { useParams } from "react-router-dom";

const CandidateDetails = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">Candidate Details</h1>
      <p className="text-gray-600">Showing details for Candidate ID: {id}</p>
    </div>
  );
};

export default CandidateDetails;
