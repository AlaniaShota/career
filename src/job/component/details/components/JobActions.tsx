import ApplyByEmailOrForm from "../../ApplyByEmailOrForm";
import type { Job } from "../../../../store/jobStore";
import Button from "../../../../component/Button";
import { Link } from "react-router-dom";

export default function JobActions({ job }: { job: Job }) {
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
      >
        <Button>Apply</Button>
      </Link>
    </div>
  );
}
