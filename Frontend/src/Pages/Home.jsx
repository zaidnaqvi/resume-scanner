import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to ResumeAI</h1>
      <p className="mt-4 text-gray-600">
        AI-powered resume screening and job matching.
      </p>
      <Link
        to="/dashboard"
        className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default Home;
