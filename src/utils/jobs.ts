import type { FilterForm } from "../page/job/component/JobsFilter";
import type { Job } from "../store/jobStore";

export function filterAndSortJobs(
  jobs: Job[] | undefined,
  filters: FilterForm
): Job[] {
  if (!jobs) return [];

  return jobs
    .filter((job) => {
      if (
        filters.search &&
        !job.title.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      if (filters.industry && job.company.industry !== filters.industry)
        return false;
      if (filters.skill && !job.skills.includes(filters.skill)) return false;
      if (filters.remote && !job.remote) return false;
      if (filters.experience && job.experienceLevel !== filters.experience)
        return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "date")
        return +new Date(b.postedAt) - +new Date(a.postedAt);
      if (filters.sort === "salary") {
        const parseTop = (s: string) =>
          +(s.match(/(\d{2,6})(?=\D*$)/)?.[0] ?? 0);
        return parseTop(b.salary) - parseTop(a.salary);
      }
      if (filters.sort === "remote") return Number(b.remote) - Number(a.remote);
      return 0;
    });
}
