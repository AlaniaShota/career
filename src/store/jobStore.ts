import { create } from "zustand";
import axios, { AxiosError } from "axios";

export interface Company {
  id: number;
  name: string;
  logo: string;
  industry: string;
}

export interface Job {
  id: number;
  title: string;
  company: {
    id: string;
    name: string;
    logo: string;
    industry: string;
    companySize?: string;
    companyType?: string;
    website?: string;
    headquarters?: string;
  };
  location: string;
  remote: boolean;
  workArrangement?: "On-site" | "Remote" | "Hybrid" | string;
  salary: string;
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
  };
  employmentType:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Internship"
    | "Temporary"
    | string;
  experienceLevel?: "Junior" | "Mid" | "Senior" | string;
  skills: string[];
  description?: string;
  fullDescription?: string;
  requirements?: string[];
  benefits?: string[];
  languages?: string[];
  contact?: {
    recruiterName?: string;
    recruiterEmail?: string;
  };
  applyLink?: string;
  status?: boolean;
  postedAt: string;
  views?: number;
  tags?: string[];
}

interface Filter {
  industry: string | null;
  skill: string | null;
}

interface JobStore {
  jobs: Job[];
  loading: boolean;
  error: string | null;
  filter: Filter;
  fetchJobs: () => Promise<void>;
  setFilter: (filter: Filter) => void;
  filteredJobs: () => Job[];
}

export const useJobStore = create<JobStore>((set, get) => ({
  jobs: [],
  loading: true,
  error: null,
  filter: { industry: null, skill: null },

  fetchJobs: async () => {
    set({ loading: true });

    try {
      const res = await axios.get<Job[]>("/jobs.json");

      set({
        jobs: res.data,
        error: null,
      });
    } catch (err: unknown) {
      const message =
        err instanceof AxiosError
          ? err.message
          : err instanceof Error
          ? err.message
          : "Unknown error";

      set({ error: message });
    } finally {
      set({ loading: false });
    }
  },

  setFilter: (filter) => set({ filter }),

  filteredJobs: () => {
    const { jobs, filter } = get();

    return jobs.filter(
      (job) =>
        (!filter.industry || job.company.industry === filter.industry) &&
        (!filter.skill || job.skills.includes(filter.skill))
    );
  },
}));
