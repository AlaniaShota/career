import { IoCheckmarkDoneSharp } from "react-icons/io5";
import GradientCard from "../../../../../component/GradientCard";

export default function LanguagesList({ languages }: { languages?: string[] }) {
  if (!languages || languages.length === 0) return null;
  const gradientStyle = "gradient-gstore";
  return (
    <GradientCard innerClassName="p-5" gradientStyle={gradientStyle} variant="premium">
      <h4 className="font-medium text-xl mb-2">Languages:</h4>
      <ul className="l text-gray-700">
        {languages.map((lang, index) => (
          <li
            key={index}
            className="flex flex-row items-center gap-2 space-y-1 "
          >
            {" "}
            <IoCheckmarkDoneSharp color="#3a6ff8" />
            {lang}
          </li>
        ))}
      </ul>
    </GradientCard>
  );
}
