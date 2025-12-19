import { IoCheckmarkDoneSharp } from "react-icons/io5";
import GradientCard from "../../../../../component/GradientCard";

export default function BenefitsList({ benefits }: { benefits?: string[] }) {
  if (!benefits || benefits.length === 0) return null;
  const gradientStyle = "gradient-magic-gold";
  return (
    <GradientCard innerClassName="p-5" gradientStyle={gradientStyle} variant="premium">
      <h4 className="font-medium text-xl mb-2">Benefits:</h4>
      <ul className=" text-gray-700">
        {benefits.map((benefit, index) => (
          <li
            key={index}
            className="flex flex-row items-center gap-2 space-y-1"
          >
            <IoCheckmarkDoneSharp color="#f5c96b" />
            {benefit}
          </li>
        ))}
      </ul>
    </GradientCard>
  );
}
