"use client";

import { motion } from "framer-motion";
import type { Job } from "../../store/jobStore";
import { cardInnerItem } from "../../utils/animations";
import ApplyByEmailOrForm from "./details/ApplyByEmailOrForm";
import { Link } from "react-router-dom";

interface Props {
  job: Job;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function JobDetails({ job }: Props) {
  return (
    <motion.div
      className="bg-white p-4 shadow-2xl rounded-2xl my-4 flex flex-col gap-2 max-h-[650px] overflow-y-auto hide-scroll scroll-smooth"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="flex flex-row justify-start items-center">
        <motion.div
          variants={cardInnerItem}
          className="bg-white w-32 h-32 m-2 shadow-xl/30 rounded-2xl"
        >
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="w-full h-full rounded-2xl object-cover"
          />
        </motion.div>
        <div className="flex flex-col items-start justify-end mx-4">
          <motion.h3
            className="text-xl text-gstore-midnight font-semibold"
            variants={itemVariants}
          >
            {job.title}
          </motion.h3>
          <motion.p className="text-gray-400" variants={itemVariants}>
            {job.company.name} - {job.location}
          </motion.p>
          {job.company.website && (
            <a
              href={job.company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gstore-blue"
            >
              {job.company.website.replace(/^https?:\/\//, "")}
            </a>
          )}
          {job.remote && (
            <div className="bg-magic-gold px-2 py-1 rounded">
              <p className="text-gstore-midnight text-sm font-medium">Remote</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex justify-start items-start flex-col mx-2 my-5">
        <div className="flex flex-row justify-center  items-center">
          <h4 className="font-semibold">Work: </h4>
          <p className="text-sm text-gray-700 pl-2">{job.workArrangement}</p>
        </div>
        <div className="flex flex-row justify-center  items-center">
          <h4 className="font-semibold">Salary: </h4>
          <p className="text-sm text-gray-700 pl-2">{job.salary}</p>
        </div>
        <div className="mt-2 flex flex-row justify-center items-center">
          {/* <h4 className="font-semibold">Skills:</h4> */}
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill) => (
              <span
                key={skill}
                className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-row justify-center mt-4 items-center">
          <h4 className="font-semibold">Experience: </h4>
          <p className="text-sm text-gray-700 pl-2">{job.experienceLevel}</p>
        </div>
        {job.requirements && job.requirements.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Requirements:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
        )}
        {job.benefits && job.benefits.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Benefits:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}
        {job.languages && job.languages.length > 0 && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Languages:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              {job.languages.map((languages, index) => (
                <li key={index}>{languages}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Description:</h4>
          <motion.p className="mt-2" variants={itemVariants}>
            {job.fullDescription}
          </motion.p>
        </div>
        {job.status ? (
          <div className="flex gap-2 mt-2">
            <Link
              to={`/apply?jobId=${job.id}&title=${encodeURIComponent(
                job.title
              )}`}
            >
              <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                Apply Now
              </button>
            </Link>
            {job.contact?.recruiterEmail && (
              <ApplyByEmailOrForm
                recruiterEmail={job.contact.recruiterEmail}
                jobTitle={job.title}
              />
            )}
          </div>
        ) : (
          <div className="px-4 py-2 font-semibold bg-gray-200 rounded-lg text-center">
            <h4 className="text-gstore-midnight">Closed</h4>
          </div>
        )}
      </div>
    </motion.div>
  );
}
