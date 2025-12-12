"use client";

interface BannerProps {
  title: string;
  description: string;
  secondaryDescription?: string;
  width?: string;
  textSize:string;
  textSizeDescription:string;
}

export default function Banner({
  title,
  description,
  secondaryDescription,
  width,
  textSize,
  textSizeDescription
}: BannerProps) {
  return (
    <div
      className={`${width} my-14 flex justify-start items-start gap-6 flex-col text-soft-silver`}
    >
      <h1 className={`${textSize}`}>{title}</h1>
      <p className={`${textSizeDescription}`}>{description}</p>
      <p className={`${textSizeDescription}`}>{secondaryDescription}</p>
    </div>
  );
}
