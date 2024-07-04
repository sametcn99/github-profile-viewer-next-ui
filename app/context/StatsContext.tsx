"use client";
import { createContext, useContext } from "react";
import { GithubContext } from "./GithubContext";
import {
  calculateLanguageDistribution,
  calculateLicenseDistribution,
  calculateTopTopics,
  calculateTotalArchived,
  calculateTotalForks,
  calculateTotalRepos,
  calculateTotalStars,
  calculateTotalTopics,
  findLatestUpdatedRepo,
  findMostStarredRepo,
  findOldestRepo,
  findRepoWithLongestUpdatePeriod,
  getCreationStatsByYear,
  getStarsPerRepo,
} from "@/lib/utils/stats";

// Step 1: Define the shape of the context data
type StatsContextProps = {
  loading: boolean;
  children?: React.ReactNode;
  totalRepos: number;
  totalStars: number;
  totalGists: number;
  totalForks: number;
  totalTopics: number;
  totalArchived: number;
  averageStarsPerRepo: number;
  starsPerRepo: Record<string, number>;
  languages: Record<string, number>;
  licenses: Record<string, number>;
  topTopics: Record<string, number>;
  creationStats: Record<string, number>;
  gistCreationStats: Record<string, number>;
  mostStarredRepo: GitHubRepo | null;
  latestUpdatedRepo: GitHubRepo | null;
  oldestRepo: GitHubRepo | null;
  updatePeriod: GitHubRepo | null;
};

// Step 2: Create the context with a default value
export const StatsContext = createContext<StatsContextProps | null>(null);

// Step 3: Create a provider component
export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { repos, gists, loading } = useContext(GithubContext);

  // Calculate stats here or fetch them from an API
  const totalRepos = calculateTotalRepos(repos);
  const totalGists = calculateTotalRepos(gists);
  const totalStars = calculateTotalStars(repos);
  const totalForks = calculateTotalForks(repos);
  const totalArchived = calculateTotalArchived(repos);
  const languages = calculateLanguageDistribution(repos);
  const licenses = calculateLicenseDistribution(repos);
  const topTopics = calculateTopTopics(repos);
  const creationStats = getCreationStatsByYear(repos);
  const gistCreationStats = getCreationStatsByYear(gists);
  const averageStarsPerRepo = totalStars / totalRepos;
  const starsPerRepo = getStarsPerRepo(repos);
  const mostStarredRepo = findMostStarredRepo(repos);
  const latestUpdatedRepo = findLatestUpdatedRepo(repos);
  const oldestRepo = findOldestRepo(repos);
  const updatePeriod = findRepoWithLongestUpdatePeriod(repos);
  const totalTopics = calculateTotalTopics(repos);
  // Create the context value object
  const statsContextValue: StatsContextProps = {
    totalRepos,
    totalGists,
    totalStars,
    totalForks,
    totalTopics,
    averageStarsPerRepo,
    starsPerRepo,
    languages,
    licenses,
    topTopics,
    creationStats,
    gistCreationStats,
    loading,
    mostStarredRepo,
    latestUpdatedRepo,
    oldestRepo,
    updatePeriod,
    totalArchived,
  };

  // Provide the context value to the child components
  return (
    <StatsContext.Provider value={statsContextValue}>
      {children}
    </StatsContext.Provider>
  );
};
