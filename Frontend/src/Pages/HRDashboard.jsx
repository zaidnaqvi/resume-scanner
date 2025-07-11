import ResumeUploadForm from "../components/ResumeUploadForm";

const HRDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800">HR Dashboard</h1>
      <p className="text-gray-600 mt-2">
        Manage job applications and candidates.
      </p>

      {/* Resume Upload Section */}
      <div className="mt-6">
        <ResumeUploadForm />
      </div>
    </div>
  );
};

export default HRDashboard;
