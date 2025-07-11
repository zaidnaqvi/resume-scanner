import { useParams } from "react-router-dom";
import ResumeUploadForm from "../components/ResumeUploadForm";

const ApplyJob = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">Apply for Job {id}</h1>
      <ResumeUploadForm />
    </div>
  );
};

export default ApplyJob;
