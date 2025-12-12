import type { Transition, Variants } from "framer-motion";

export const unifiedTransition: Transition = {
  duration: 0.35,
  ease: "easeInOut",
};
export const hoverTransition = unifiedTransition;

export const listContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

export const cardItem: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: unifiedTransition },
};

export const cardWrapperHover = {
  scale: 1.01,
  y: 0,
  boxShadow: "0 15px 25px rgba(0,0,0,0.18)",
};

export const cardInnerItem: Variants = {
  hidden: { opacity: 0, y: 2 },
  visible: { opacity: 1, y: 0, transition: unifiedTransition },
};

export function getJobCardClass(isSelected: boolean, isOtherSelected: boolean) {
  return {
    className: `
      cursor-pointer w-full rounded-2xl transition-all
      ${isSelected ? "border-2 border-blue-500 shadow-md" : ""}
    `,
    style: { opacity: isOtherSelected ? 0.2 : 1 },
  };
}

export const typingLetterVariant: Variants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.03,
      duration: 0.05,
    },
  }),
};
