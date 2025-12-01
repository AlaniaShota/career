import type { Job } from "../../../../store/jobStore";


interface JobMetaProps {
  job: Job;
}

export default function JobMeta({ job }: JobMetaProps) {
  return (
    <div className="flex flex-col mx-2 my-5 gap-2 font-medium">
      <Row label="Work" value={job.workArrangement} />
      <Row label="Salary" value={job.salary} />
      <Row label="Experience" value={job.experienceLevel} />
    </div>
  );
}

interface RowProps {
  label: string;
  value?: string; 
}

function Row({ label, value }: RowProps) {
  if (!value) return null;

  return (
    <div className="flex flex-row items-center">
      <h4 className="font-medium">{label}: </h4>
      <p className="text-sm text-gray-700 pl-2">{value}</p>
    </div>
  );
}
