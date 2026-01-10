"use client";

import { motion } from "framer-motion";
import { typingLetterVariant } from "../utils/animations";

interface BannerProps {
  title: string;
  description: string;
  secondaryDescription?: string;
  width?: string;
  textSize: string;
  textSizeDescription: string;
}

interface AnimatedLettersProps {
  text: string;
  width?: string;
}

export const AnimatedLetters = ({ text, width }: AnimatedLettersProps) => {
  const cleanText = text.replace(/\n/g, " ");

  return (
    <p className={`${width} relative inline-block whitespace-normal`}>
      {cleanText.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={typingLetterVariant}
          initial="hidden"
          animate="visible"
          custom={i}
          className="inline-block whitespace-pre"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}

      <motion.span
        className="inline-block w-full bg-soft-silver ml-1"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    </p>
  );
};

export default function Banner({
  title,
  description,
  secondaryDescription,
  width,
  textSize,
  textSizeDescription,
}: BannerProps) {
  return (
    <div className={`my-6 md:my-14 flex flex-col gap-6 text-soft-silver`}>
      <h1 className={textSize}>
        <AnimatedLetters text={title} width={width} />
      </h1>

      <div className={textSizeDescription}>
        <AnimatedLetters text={description} width={width} />
      </div>

      {secondaryDescription && (
        <div className={textSizeDescription}>
          <AnimatedLetters text={secondaryDescription} width={width} />
        </div>
      )}
    </div>
  );
}
