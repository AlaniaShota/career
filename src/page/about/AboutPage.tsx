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
  const bannerWidth = "md:w-3/5 w-4/5";
  const textSize = "md:text-6xl text-3xl ";
  const textSizeDescription = "md:text-xl text-lg ";

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        <div className="flex flex-col justify-center md:justify-start items-center md:items-start">
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
        <div className="mt-6 md:mt-16 flex flex-col justify-center items-center">
          <motion.img
            variants={cardItem}
            whileHover={cardWrapperHover}
            transition={hoverTransition}
            src={aboutPageImg}
            alt="About"
            className=" w-auto rounded-2xl object-cover"
          />
          <p className="text-soft-silver pt-5 md:pt-10 w-auto mdw-2/4">
            <AnimatedLetters text={lorem} />
          </p>
        </div>
      </div>
      <Employees />
      <Team />
    </>
  );
}
