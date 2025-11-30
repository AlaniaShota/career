import { Link } from "react-router-dom";
import ApplyByEmailOrForm from "./ApplyByEmailOrForm";
import type { Job } from "../../../../store/jobStore";
interface JobActionsProps {
  job: Job;
}
export default function JobActions({ job }: JobActionsProps) {
  if (!job.status)
    return (
      <div className="px-4 py-2 font-thin bg-gray-200 rounded-lg text-center">
        <h4 className="text-gstore-midnight">Closed</h4>
      </div>
    );

  return (
    <div className="flex justify-end w-full gap-2 mt-2">
      {job.contact?.recruiterEmail && (
        <ApplyByEmailOrForm
          recruiterEmail={job.contact.recruiterEmail}
          jobTitle={job.title}
        />
      )}
      <Link
        to={`/apply?jobId=${job.id}&title=${encodeURIComponent(job.title)}`}
        className="cursor-pointer"
      >
        <button className="px-4 py-2 bg-green-500 cursor-pointer text-white rounded hover:bg-green-600">
          Apply Now
        </button>
      </Link>
    </div>
  );
}
