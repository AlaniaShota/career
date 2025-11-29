import { Link } from "react-router-dom";
import ApplyByEmailOrForm from "./ApplyByEmailOrForm";
import type { Job } from "../../../../store/jobStore";
interface JobActionsProps {
    job: Job;
  }
export default function JobActions({ job }:JobActionsProps) {
  if (!job.status)
    return (
      <div className="px-4 py-2 font-semibold bg-gray-200 rounded-lg text-center">
        <h4 className="text-gstore-midnight">Closed</h4>
      </div>
    );

  return (
    <div className="flex justify-end w-full gap-2 mt-2">
      <Link to={`/apply?jobId=${job.id}&title=${encodeURIComponent(job.title)}`}>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Apply Now
        </button>
      </Link>

      {job.contact?.recruiterEmail && (
        <ApplyByEmailOrForm
          recruiterEmail={job.contact.recruiterEmail}
          jobTitle={job.title}
        />
      )}
    </div>
  );
}
