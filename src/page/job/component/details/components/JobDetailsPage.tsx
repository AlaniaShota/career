import { useParams, useNavigate } from "react-router-dom";
import { useJobStore } from "../../../../../store/jobStore";
import JobDetails from "../JobDetails";

export default function JobDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
  
    const jobs = useJobStore((state) => state.jobs);
    const job = jobs.find((j) => j.id === Number(id));
  
    if (!job) {
      return (
        <div className="p-6 text-center">
          <p className="text-gray-500 mb-4">Job not found</p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            onClick={() => navigate("/")}
          >
            Back to Jobs
          </button>
        </div>
      );
    }
  
    return <JobDetails job={job} />;
  }
