"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Job } from "../../store/jobStore";

interface Props {
  jobs: Job[];
  selectedIndustry: string | null;
  selectedSkill: string | null;
  setSelectedIndustry: (ind: string | null) => void;
  setSelectedSkill: (skill: string | null) => void;
  remoteOnly: boolean;
  setRemoteOnly: (v: boolean) => void;
  experience: string | null;
  setExperience: (v: string | null) => void;
  sortBy: "date" | "salary" | "remote" | "default";
  setSortBy: (s: "date" | "salary" | "remote" | "default") => void;
  clearAll: () => void;
}

export default function JobsFilter({
  jobs,
  selectedIndustry,
  selectedSkill,
  setSelectedIndustry,
  setSelectedSkill,
  remoteOnly,
  setRemoteOnly,
  experience,
  setExperience,
  sortBy,
  setSortBy,
  clearAll,
}: Props) {
  const industries = useMemo(
    () => Array.from(new Set(jobs.map((j) => j.company.industry))).sort(),
    [jobs]
  );
  const allSkills = useMemo(
    () => Array.from(new Set(jobs.flatMap((j) => j.skills))).sort(),
    [jobs]
  );


  const [skillQuery, setSkillQuery] = useState("");
  const [openSkills, setOpenSkills] = useState(false);
  const skillRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!skillRef.current) return;
      if (!skillRef.current.contains(e.target as Node)) setOpenSkills(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const skillsFiltered = useMemo(() => {
    const q = skillQuery.trim().toLowerCase();
    return q ? allSkills.filter((s) => s.toLowerCase().includes(q)) : allSkills;
  }, [allSkills, skillQuery]);

  const showClear =
    selectedIndustry !== null ||
    selectedSkill !== null ||
    remoteOnly ||
    experience !== null ||
    sortBy !== "default";

  return (
    <motion.aside
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-4 rounded-lg shadow-sm border"
      style={{
        borderColor: "var(--color-gstore-midnight, #0C1220)",
      }}
    >
      <h3
        className="text-lg font-semibold mb-3"
        style={{ color: "var(--color-gstore-midnight)" }}
      >
        Filters
      </h3>

      <div className="mb-3">
        <label className="block text-sm mb-1">Industry</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={selectedIndustry ?? ""}
          onChange={(e) => setSelectedIndustry(e.target.value || null)}
          style={{ borderColor: "var(--color-gstore-blue)" }}
        >
          <option value="">All industries</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3" ref={skillRef}>
        <label className="block text-sm mb-1">Skill</label>

        <div className="relative">
          <button
            onClick={() => setOpenSkills((s) => !s)}
            className="w-full text-left border rounded px-3 py-2 flex justify-between items-center"
            style={{ borderColor: "var(--color-gstore-blue)" }}
          >
            <span>{selectedSkill ?? "All skills"}</span>
            <span className="text-sm opacity-60">{openSkills ? "▲" : "▼"}</span>
          </button>

          {openSkills && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute z-20 mt-2 w-full bg-white border rounded shadow max-h-48 overflow-auto"
              style={{ borderColor: "var(--color-gstore-blue)" }}
            >
              <div className="p-2">
                <input
                  value={skillQuery}
                  onChange={(e) => setSkillQuery(e.target.value)}
                  placeholder="Search skill..."
                  className="w-full px-2 py-2 border rounded"
                />
              </div>

              <div className="divide-y">
                {skillsFiltered.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSkill(s);
                      setOpenSkills(false);
                      setSkillQuery("");
                    }}
                    className={`w-full text-left px-3 py-2 hover:bg-gray-50 ${
                      selectedSkill === s ? "bg-gray-100" : ""
                    }`}
                  >
                    {s}
                  </button>
                ))}
                {skillsFiltered.length === 0 && (
                  <div className="p-3 text-sm text-gray-500">No skills</div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm">Remote only</span>
        <button
          onClick={() => setRemoteOnly(!remoteOnly)}
          className={`w-12 h-6 rounded-full p-1 transition-all ${
            remoteOnly ? "bg-[var(--color-gstore-blue)]" : "bg-gray-200"
          }`}
          aria-pressed={remoteOnly}
        >
          <span
            className={`block w-4 h-4 bg-white rounded-full shadow transform transition-all ${
              remoteOnly ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <div className="mb-3">
        <label className="block text-sm mb-2">Experience</label>
        <div className="flex gap-2">
          {["Junior", "Middle", "Senior"].map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setExperience(experience === lvl ? null : lvl);
              }}
              className={`px-3 py-1 rounded-full border transition ${
                experience === lvl
                  ? "bg-[var(--color-magic-gold)] border-transparent"
                  : "bg-white"
              }`}
              style={{ borderColor: "var(--color-gstore-blue)" }}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="block text-sm mb-1">Sort by</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          style={{ borderColor: "var(--color-gstore-blue)" }}
        >
          <option value="default">Default</option>
          <option value="date">Newest</option>
          <option value="salary">By salary (top)</option>
          <option value="remote">Remote first</option>
        </select>
      </div>

      <div className="mb-3">
        <div className="flex flex-wrap gap-2">
          {selectedIndustry && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
              {selectedIndustry}
              <button
                onClick={() => setSelectedIndustry(null)}
                className="ml-1 text-xs"
              >
                ×
              </button>
            </span>
          )}
          {selectedSkill && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
              {selectedSkill}
              <button
                onClick={() => setSelectedSkill(null)}
                className="ml-1 text-xs"
              >
                ×
              </button>
            </span>
          )}
          {remoteOnly && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
              Remote
              <button
                onClick={() => setRemoteOnly(false)}
                className="ml-1 text-xs"
              >
                ×
              </button>
            </span>
          )}
          {experience && (
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-sm">
              {experience}
              <button
                onClick={() => setExperience(null)}
                className="ml-1 text-xs"
              >
                ×
              </button>
            </span>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={clearAll}
          className={`px-3 py-2 rounded flex-1 font-medium transition ${
            showClear
              ? "bg-[var(--color-magic-gold)]"
              : "bg-gray-100 pointer-events-none opacity-60"
          }`}
        >
          Reset
        </button>

        <button
          onClick={() => {
            setRemoteOnly(true);
            setExperience("Junior");
          }}
          className="px-3 py-2 rounded border"
          style={{ borderColor: "var(--color-gstore-blue)" }}
        >
          Quick
        </button>
      </div>
    </motion.aside>
  );
}
