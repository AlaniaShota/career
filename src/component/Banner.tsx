"use client";

import { Fragment } from "react";
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
  const words = cleanText.split(" ");
  let charIndex = 0;

  return (
    <p className={`${width ?? ""} relative inline-block whitespace-normal`}>
      {words.map((word, wordIndex) => (
        <Fragment key={`word-${wordIndex}`}>
          <span className="inline-block whitespace-nowrap">
            {word.split("").map((char) => {
              const index = charIndex++;
              return (
                <motion.span
                  key={`${wordIndex}-${index}`}
                  variants={typingLetterVariant}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
          {wordIndex < words.length - 1 && (
            <span className="inline-block w-2" aria-hidden="true" />
          )}
        </Fragment>
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
