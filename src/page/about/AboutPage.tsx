import Banner, { AnimatedLetters } from "../../component/Banner";
import aboutPageImg from "../../assets/Copilot_20251212_202913.png";
import {
  description,
  help,
  lorem,
  mission,
  secondaryDescription,
  title,
} from "./component/constanta";
import Employees from "./component/Employees";
import {
  cardItem,
  cardWrapperHover,
  hoverTransition,
} from "../../utils/animations";
import { motion } from "framer-motion";
import Team from "./component/Team";

export default function AboutPage() {
  const bannerWidth = "w-3/5";
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
        <div className="mt-16 flex flex-col justify-center items-center">
          <motion.img
            variants={cardItem}
            whileHover={cardWrapperHover}
            transition={hoverTransition}
            src={aboutPageImg}
            alt="About"
            className="w-2/4 rounded-2xl object-cover"
          />
          <p className="text-soft-silver pt-10 w-2/4">
            <AnimatedLetters text={lorem} />
          </p>
        </div>
      </div>
      <Employees />
      <Team />
    </>
  );
}
