import { IoCheckmarkDoneSharp } from "react-icons/io5";
import GradientCard from "../../../../../component/GradientCard";

interface RequirementsListProps {
  requirements?: string[];
}

export default function RequirementsList({
  requirements,
}: RequirementsListProps) {
  if (!requirements?.length) return null;
  const gradientStyle = "gradient-gstore";
  return (
    <GradientCard
      innerClassName="p-5"
      gradientStyle={gradientStyle}
      variant="premium"
    >
      <h4 className="font-medium text-xl mb-3">Requirements</h4>
      <ul className="text-gray-700 space-y-2">
        {requirements.map((req, i) => (
          <li key={i} className="flex items-center gap-2">
            <IoCheckmarkDoneSharp color="#3a6ff8" />
            {req}
          </li>
        ))}
      </ul>
    </GradientCard>
  );
}
