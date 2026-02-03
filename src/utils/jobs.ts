import type { FilterForm } from "../page/job/component/JobsFilter";
import type { Job } from "../store/jobStore";

export function filterAndSortJobs(
  jobs: Job[] | undefined,
  filters: Partial<FilterForm>
): Job[] {
  if (!jobs) return [];
  const resolvedFilters: FilterForm = {
    search: "",
    industry: null,
    skill: null,
    remote: false,
    experience: null,
    sort: "default",
    ...filters,
  };

  const normalize = (value: string) =>
    value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const searchQuery = normalize(resolvedFilters.search);

  return jobs
    .filter((job) => {
      if (searchQuery) {
        const haystack = [
          job.title,
          job.company.name,
          job.company.id,
          job.company.website,
          job.company.industry,
          job.location,
          job.employmentType,
          job.experienceLevel,
          job.workArrangement,
          job.description,
          job.tags?.join(" "),
          job.skills.join(" "),
          job.requirements?.join(" "),
          job.benefits?.join(" "),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!normalize(haystack).includes(searchQuery)) return false;
      }
      if (
        resolvedFilters.industry &&
        job.company.industry !== resolvedFilters.industry
      )
        return false;
      if (
        resolvedFilters.skill &&
        !job.skills.includes(resolvedFilters.skill)
      )
        return false;
      if (resolvedFilters.remote && !job.remote) return false;
      if (
        resolvedFilters.experience &&
        job.experienceLevel !== resolvedFilters.experience
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      if (resolvedFilters.sort === "date")
        return +new Date(b.postedAt) - +new Date(a.postedAt);
      if (resolvedFilters.sort === "salary") {
        const parseTop = (s: string) =>
          +(s.match(/(\d{2,6})(?=\D*$)/)?.[0] ?? 0);
        return parseTop(b.salary) - parseTop(a.salary);
      }
      if (resolvedFilters.sort === "remote")
        return Number(b.remote) - Number(a.remote);
      return 0;
    });
}
