import Banner from "../../component/Banner";
import { motion } from "framer-motion";
import { description, title } from "./component/constanta";
import contactPageImg from "../../assets/Copilot_20251218_135337.png";
import {
  cardItem,
  cardWrapperHover,
  hoverTransition,
} from "../../utils/animations";
import Support from "./component/Support";
import MessageToSupport from "./component/MessageToSupport";
import Office from "./component/Office";

export default function ContactPage() {
  const textSize = "text-6xl";
  const textSizeDescription = "text-xl";

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="flex justify-between items-center flex-row">
        <div className="flex flex-col justify-between items-start">
          <Banner
            title={title}
            description={description}
            textSize={textSize}
            textSizeDescription={textSizeDescription}
          />
          <Support />
        </div>
        <div className="mt-16 flex flex-col justify-end items-end">
          <motion.img
            variants={cardItem}
            whileHover={cardWrapperHover}
            transition={hoverTransition}
            src={contactPageImg}
            alt="Contact"
            className="w-2/4 rounded-2xl object-cover"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-start  gap-34 w-full">
        <MessageToSupport />
        <Office />
      </div>
    </div>
  );
}
