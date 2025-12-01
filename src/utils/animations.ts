import { type Variants, type Transition } from "framer-motion";

export const hoverTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 30,
};

export const listContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const cardItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: hoverTransition,
  },
};

export const cardWrapperHover = {
  scale: 1.01,
  y: 1,
  boxShadow: "0 15px 25px rgba(0,0,0,0.18)",
};

export const cardInnerItem: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 25,
    },
  },
};
export function getJobCardClass(isSelected: boolean, isOtherSelected: boolean) {
  return {
    className: `cursor-pointer w-full rounded-2xl transition-all ${
      isSelected
        ? "bg-blue-50 shadow-2xl border border-blue-300"
        : "bg-white shadow-sm border border-gray-200"
    }`,
    style: { opacity: isOtherSelected ? 0.2 : 1 },
  };
}
