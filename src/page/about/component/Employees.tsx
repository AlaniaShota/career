import {
  cardItem,
  cardWrapperHover,
  hoverTransition,
} from "../../../utils/animations";
import secondEmployee from "../../../assets/fast-ink-y43tNhAVDNs-unsplash.png";
import thirdEmployee from "../../../assets/irvan-maulana-_vBQVlMR4rg-unsplash.png";
import fourthEmployee from "../../../assets/karacis-studio-TFQIyR8-lDI-unsplash.png";
import { motion } from "framer-motion";

export default function Employees() {
  const employersData = [
    {
      id: 1,
      name: "Giorgi Beridze",
      post: "Lead Developer",
      img: secondEmployee,
    },
    {
      id: 2,
      name: "Nino Kapanadze",
      post: "UX Designer",
      img: thirdEmployee,
    },
    {
      id: 3,
      name: "Shota Alania",
      post: "Web Developer",
      img: fourthEmployee,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row w-full justify-around my-18 text-soft-silver gap-6 md:-gap-0">
      {employersData.map((item) => (
        <motion.div
          key={item.id}
          variants={cardItem}
          whileHover={cardWrapperHover}
          transition={hoverTransition}
          className="rounded-2xl flex flex-wrap flex-row justify-center items-start w-2xs"
        >
          <img
            src={item.img}
            alt={item.name}
            className="w-full rounded-2xl object-cover "
          />
          <div className="flex justify-start flex-col items-center mt-6">
            <h1 className="text-2xl">{item.name}</h1>
            <p className="text-ms">{item.post}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
