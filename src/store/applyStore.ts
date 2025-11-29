import { create } from "zustand";

export interface Application {
  jobId: string | null;
  jobTitle: string | null;
  name: string;
  lastName: string;
  email: string;
  number: string;
  linkedin?: string;
  portfolio?: string;
  cvFileName?: string;
  cvFile?: File; // добавили сам файл
  submittedAt?: string;
}

interface ApplyStore {
  applications: Application[];
  addApplication: (app: Application) => void;
}

// сразу читаем из localStorage при инициализации
const savedApplications: Application[] = JSON.parse(
  localStorage.getItem("applications") || "[]"
);

export const useApplyStore = create<ApplyStore>((set, get) => ({
  applications: savedApplications,

  addApplication: (app) => {
    const newApp = { ...app, submittedAt: new Date().toISOString() };
    const newApplications = [...get().applications, newApp];

    // сохраняем в localStorage
    localStorage.setItem("applications", JSON.stringify(newApplications));

    set({ applications: newApplications });
  },
}));
