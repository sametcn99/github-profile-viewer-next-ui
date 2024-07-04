// stats.ts

/**
 * Calculates the total number of repositories.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {number} - Total number of repositories.
 */
export const calculateTotalRepos = (repos: GitHubRepo[]): number => {
  return repos.length;
};

/**
 * Calculates the total number of stars across all repositories.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {number} - Total number of stars.
 */
export const calculateTotalStars = (repos: GitHubRepo[]): number => {
  return repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
};

/**
 * Finds the repository with the highest number of stars.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {GitHubRepo} - Repository with the most stars.
 */
export const findMostStarredRepo = (repos: GitHubRepo[]): GitHubRepo => {
  return repos.reduce(
    (max, repo) => (max.stargazers_count > repo.stargazers_count ? max : repo),
    repos[0],
  );
};

/**
 * Finds the repository with the latest update date.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {GitHubRepo} - Repository with the latest push date.
 */
export const findLatestUpdatedRepo = (repos: GitHubRepo[]): GitHubRepo => {
  return repos.reduce(
    (latest, repo) =>
      new Date(latest.pushed_at) > new Date(repo.pushed_at) ? latest : repo,
    repos[0],
  );
};

/**
 * Calculates the total number of forked repositories.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {number} - Total number of forked repositories.
 */
export const calculateTotalForks = (repos: GitHubRepo[]): number => {
  return repos.filter((repo) => repo.fork).length;
};

/**
 * Calculates the total number of archived repositories.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {number} - Total number of archived repositories.
 */
export const calculateTotalArchived = (repos: GitHubRepo[]): number => {
  return repos.filter((repo) => repo.archived).length;
}

/**
 * Calculates the distribution of programming languages across all repositories.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {Record<string, number>} - Language distribution as an object.
 */
export const calculateLanguageDistribution = (
  repos: GitHubRepo[],
): Record<string, number> => {
  const languageDistribution: Record<string, number> = {};

  repos.forEach((repo) => {
    const language = repo.language || "Unknown";
    languageDistribution[language] = (languageDistribution[language] || 0) + 1;
  });

  const sortedLanguageDistribution = Object.entries(languageDistribution)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

  return sortedLanguageDistribution;
};

/**
 * Calculates the distribution of repository licenses across all repositories.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {Record<string, number>} - License distribution as an object.
 */
export const calculateLicenseDistribution = (
  repos: GitHubRepo[],
): Record<string, number> => {
  const licenseDistribution: Record<string, number> = {};

  repos.forEach((repo) => {
    const license =
      repo.license_spdx_id ||
      (repo.license && repo.license.spdx_id) ||
      "Unknown";
    if (typeof license === "string") {
      licenseDistribution[license] = (licenseDistribution[license] || 0) + 1;
    } else {
      console.log(`Invalid license_spdx_id type for repo: ${repo.name}`);
      licenseDistribution["Unknown"] =
        (licenseDistribution["Unknown"] || 0) + 1;
    }
  });
  const sortedLicenseDistribution = Object.entries(licenseDistribution)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
  return sortedLicenseDistribution;
};

/**
 * Finds the oldest repository based on the creation date.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {GitHubRepo | null} - Oldest repository or null if the array is empty.
 */
export const findOldestRepo = (repos: GitHubRepo[]): GitHubRepo | null => {
  return repos.reduce(
    (oldest, repo) =>
      oldest === null || new Date(repo.created_at) < new Date(oldest.created_at)
        ? repo
        : oldest,
    null as unknown as GitHubRepo,
  );
};

/**
 * Finds the repository with the longest update period (difference between created_at and pushed_at).
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {GitHubRepo | null} - Repository with the longest update period or null if the array is empty.
 */
export const findRepoWithLongestUpdatePeriod = (
  repos: GitHubRepo[],
): GitHubRepo | null => {
  if (repos.length === 0) {
    return null;
  }

  return repos.reduce(
    (latest, repo) =>
      new Date(repo.pushed_at).getTime() - new Date(repo.created_at).getTime() >
      new Date(latest.pushed_at).getTime() -
        new Date(latest.created_at).getTime()
        ? repo
        : latest,
    repos[0],
  );
};

/**
 * Calculates the most common topics used across the given GitHub repositories.
 *
 * @param repos - Array of GitHub repository objects to analyze.
 * @returns Record with keys of topic names and values of occurrence counts.
 */
export const calculateTopTopics = (
  repos: GitHubRepo[],
): Record<string, number> => {
  const topicCounts: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.topics) {
      repo.topics.forEach((topic) => {
        if (typeof topic === "string") {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        }
      });
    }
  });
  const sortedTopicCounts = Object.entries(topicCounts)
    .sort((a, b) => b[1] - a[1]) // Değerlere göre sırala
    .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {}); // Yeniden objeye çevir

  return sortedTopicCounts;
};

/**
 * Generates statistics about repository creation dates by year.
 * Iterates through the provided array of repositories, extracting the creation date for each one.
 * The creation years are tallied in a stats object.
 * Returns an array of objects containing the year and count for each year.
 */
export const getCreationStatsByYear = (repos: GitHubRepo[]) => {
  const stats: { [year: string]: number } = {};

  repos.forEach((repo) => {
    const date = new Date(repo.created_at);
    const year = date.getFullYear().toString();

    if (!stats[year]) {
      stats[year] = 0;
    }

    stats[year]++;
  });
  Object.entries(stats).map(([year, count]) => ({
    category: year,
    value: count,
  }));
  return stats;
};

/**
 * Calculates the number of stars per GitHub repository in the given array.
 * @param repos - Array of GitHub repository objects to analyze.
 * @returns Object mapping repository name to stargazer count.
 */
export function getStarsPerRepo(repos: GitHubRepo[]) {
  interface StarsPerRepo {
    [key: string]: number;
  }

  const starsPerRepo: StarsPerRepo = {};

  repos.forEach((repo) => {
    if (repo.stargazers_count > 0) {
      starsPerRepo[repo.name] = repo.stargazers_count;
    }
  });

  const sortedStarsPerRepo = Object.entries(starsPerRepo)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, [name, stars]) => {
      acc[name] = stars;
      return acc;
    }, {} as StarsPerRepo);

  return sortedStarsPerRepo;
}

/**
 * Calculates the total number of unique topics across the given GitHub repos.
 * Iterates through all repos, collects the topics for each repo into a Set to get
 * unique values, and returns the size of the set.
 */
export const calculateTotalTopics = (repos: GitHubRepo[]): number => {
  let uniqueTopics = new Set<string>();
  repos.forEach((repo) => {
    if (repo.topics) {
      repo.topics.forEach((topic) => {
        uniqueTopics.add(topic);
      });
    }
  });
  return uniqueTopics.size;
};
