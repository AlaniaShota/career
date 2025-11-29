"use client";

import { motion } from "framer-motion";
import type { Job } from "../../../../store/jobStore";
interface JobHeaderProps {
    job: Job;
  }
export default function JobHeader({ job }:JobHeaderProps) {
  return (
    <div className="flex flex-row justify-start items-center">
      <motion.div
        className="bg-white w-32 h-32 m-2 shadow-xl/30 rounded-2xl"
      >
        <img
          src={job.company.logo}
          alt={job.company.name}
          className="w-full h-full rounded-2xl object-cover"
        />
      </motion.div>

      <div className="flex flex-col items-start justify-end mx-4">
        <h3 className="text-xl text-gstore-midnight font-semibold">
          {job.title}
        </h3>
        <p className="text-gray-400">
          {job.company.name} - {job.location}
        </p>

        {job.company.website && (
          <a
            href={job.company.website}
            target="_blank"
            className="text-gstore-blue"
          >
            {job.company.website.replace(/^https?:\/\//, "")}
          </a>
        )}

        {job.remote && (
          <div className="bg-magic-gold px-2 py-1 rounded mt-1">
            <p className="text-gstore-midnight text-sm font-medium">Remote</p>
          </div>
        )}
      </div>
    </div>
  );
}
