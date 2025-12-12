import Banner from "../../component/Banner";
import aboutPageImg from "/public/Copilot_20251212_202913.png";
import {
  description,
  help,
  lorem,
  mission,
  secondaryDescription,
  title,
} from "./component/constanta";

export default function AboutPage() {
  const bannerWidth = "w-2/4";
  const textSize = "text-6xl";
  const textSizeDescription = "text-xl";

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col justify-start items-start">
          <Banner
            title={title}
            description={description}
            secondaryDescription={secondaryDescription}
            width={bannerWidth}
            textSize={textSize}
            textSizeDescription={textSizeDescription}
          />
          <Banner
            title={mission}
            description={help}
            width={bannerWidth}
            textSize={textSize}
            textSizeDescription={textSizeDescription}
          />
        </div>
        <div className="mt-14">
          <img
            src={aboutPageImg}
            alt="About"
            className="w-3/5 rounded-2xl object-cover"
          />
          <p className="text-soft-silver pt-10 w-2/3">
    {lorem}
          </p>
        </div>
      </div>
    </>
  );
}
