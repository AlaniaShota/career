import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import defaultLogo from "../../../public/163.jpg";
import type { FilterForm } from "./JobsFilter";
import type { Job } from "../../store/jobStore";

import {
  listContainer,
  cardItem,
  cardWrapperHover,
  hoverTransition,
  getJobCardClass,
  cardInnerItem,
  unifiedTransition,
} from "../../utils/animations";
import { filterAndSortJobs } from "../../utils/jobs";
import Button from "../../component/Button";
import { Link } from "react-router-dom";

interface Props {
  jobs: Job[];
  selectedJobId?: number;
  onSelect: (job: Job) => void;
}

export default function JobCards({ jobs, selectedJobId, onSelect }: Props) {
  const { watch } = useFormContext<FilterForm>();
  const filters = watch();

  const filteredJobs = useMemo(
    () => filterAndSortJobs(jobs, filters),
    [jobs, filters]
  );

  if (!filteredJobs.length)
    return <div className="p-6 text-center text-gray-500">Nothing found</div>;

  return (
    <motion.div
      className="flex flex-col justify-center items-center w-3/5 gap-4"
      variants={listContainer}
      initial="hidden"
      animate="visible"
    >
      {filteredJobs.map((job) => {
        const isSelected = selectedJobId === job.id;
        const isOtherSelected = selectedJobId !== undefined && !isSelected;

        const { className } = getJobCardClass(isSelected, isOtherSelected);

        return (
          <motion.div
            key={job.id}
            variants={cardItem}
            whileHover={cardWrapperHover}
            transition={hoverTransition}
            animate={{ opacity: isOtherSelected ? 0.55 : 1 }}
            onClick={() => onSelect(job)}
            className={className}
          >
            <Card job={job} />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

const Section = ({
  title,
  children,
  delay,
}: {
  title: string;
  children: React.ReactNode;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
  >
    <h4 className="font-semibold text-sm mb-1">{title}</h4>
    {children}
  </motion.div>
);

const ListSection = ({
  title,
  items,
  delay,
}: {
  title: string;
  items?: string[];
  delay: number;
}) =>
  items?.length ? (
    <Section title={title} delay={delay}>
      <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </Section>
  ) : null;

function Card({ job }: { job: Job }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout="position"
      transition={{ layout: unifiedTransition }}
      className="p-6 bg-white rounded-2xl shadow-sm border  flex flex-col gap-4 cursor-pointer"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src={job.company.logo}
            alt={job.company.name}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = defaultLogo;
            }}
          />

          <div>
            <h2 className="text-lg text-gstore-blue">{job.company.name}</h2>
            <p className="text-gray-500 text-sm">
              {job.location} • {job.workArrangement}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-gray-600">
            <FaEye />
            <p>{job.views}</p>
          </div>

          <Link
            to={`/apply?jobId=${job.id}&title=${encodeURIComponent(job.title)}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Button>Apply</Button>
          </Link>
        </div>
      </div>
      <motion.div
        variants={cardInnerItem}
        initial="hidden"
        animate="visible"
        className="font-medium cursor-pointer flex flex-row justify-between items-center w-full"
        whileHover={{ y: -1, color: "#1D4ED8" }}
      >
        <h3 className="text-xl font-light">{job.title}</h3>

        <p className="text-xl font-light">
          {job.salaryRange
            ? `$${job.salaryRange.min.toLocaleString()} – $${job.salaryRange.max.toLocaleString()}`
            : job.salary}
        </p>
      </motion.div>
      {job.description && (
        <p className="text-gray-700 text-sm">{job.description}</p>
      )}
      <div className="flex justify-end items-center">
        <Button
          variant="secondary"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen((prev) => !prev);
          }}
        >
          {isOpen ? "Show less" : "Show more"}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout="position"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={unifiedTransition}
            className="border-t border-gray-200 pt-4"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout="size"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={unifiedTransition}
            className="overflow-hidden cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-8 pt-2">
              <div className="space-y-6">
                <Section title="Company" delay={0.05}>
                  <p className="text-sm text-gray-700">
                    Industry: {job.company.industry}
                  </p>
                  <p className="text-sm text-gray-700">
                    Company size: {job.company.companySize}
                  </p>
                  <p className="text-sm text-gray-700">
                    Type: {job.company.companyType}
                  </p>

                  <a
                    href={job.company.website}
                    target="_blank"
                    className="text-sm text-blue-600 underline"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {job.company.website}
                  </a>

                  <p className="text-sm text-gray-700">
                    Headquarters: {job.company.headquarters}
                  </p>
                </Section>

                <ListSection
                  title="Benefits"
                  items={job.benefits}
                  delay={0.1}
                />
                <ListSection
                  title="Requirements"
                  items={job.requirements}
                  delay={0.15}
                />
              </div>

              <div className="space-y-6">
                <div className="flex justify-start items-center gap-2">
                  {" "}
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-600 font-thin px-2 py-1 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <ListSection
                  title="Languages"
                  items={job.languages}
                  delay={0.25}
                />

                {job.contact && (
                  <Section title="Contact" delay={0.3}>
                    <p className="text-sm text-blue-600 underline">
                      {job.contact.recruiterName}
                    </p>
                    <p className="text-sm text-gray-700">
                      {job.contact.recruiterEmail}
                    </p>
                  </Section>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
