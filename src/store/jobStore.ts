import { create } from "zustand";
import axios from "axios";

export interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
}

export interface Job {
  id: number;
  title: string;
  company: Company;
  location: string;
  remote: boolean;
  salary: string;
  employmentType: string;
  experienceLevel: string;
  skills: string[];
  description: string;
  postedAt: string;
}

interface JobFilters {
  industry: string | null;
  skill: string | null;
}

interface JobState {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  filters: JobFilters;
  fetchJobs: () => Promise<void>;
  setFilter: (filter: Partial<JobFilters>) => void;
  filteredJobs: () => Job[];
}

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  loading: false,
  error: null,
  filters: { industry: null, skill: null },
  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get<Job[]>("/jobs.json");
      set({ jobs: res.data, loading: false });
    } catch (err: any) {
      console.error("Error fetching jobs:", err);
      set({ error: err.message, loading: false });
    }
  },
  setFilter: (filter) => set({ filters: { ...get().filters, ...filter } }),
  filteredJobs: () => {
    const { jobs, filters } = get();
    return jobs.filter((job) => {
      const industryMatch =
        !filters.industry || job.company.industry === filters.industry;
      const skillMatch = !filters.skill || job.skills.includes(filters.skill);
      return industryMatch && skillMatch;
    });
  },
}));
