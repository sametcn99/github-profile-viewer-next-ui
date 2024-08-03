"use client";
import { GithubContext } from "@/app/context/GithubContext";
import Loading from "@/app/loading";
import { useRepositoryFilters } from "@/hooks/useRepositoryFilters";
import { extractUniqueValues } from "@/lib/utils";
import { Box } from "@radix-ui/themes";
import { useContext, useMemo } from "react";
import { VList } from "virtua";
import FilterBar from "./FilterBar";
import ReposCard from "./ReposCard";

export default function Repositories() {
  const { repos, loading } = useContext(GithubContext);
  const {
    sort,
    setSort,
    setFilterValue,
    selectedTopic,
    setSelectedTopic,
    selectedLanguage,
    setSelectedLanguage,
    selectedFilter,
    setSelectedFilter,
    selectedLicense,
    setSelectedLicense,
    handleFilterClick,
    filteredAndSortedRepos,
  } = useRepositoryFilters(repos);

  const handleTopicClick = (topic: string): void => {
    handleFilterClick(topic, setSelectedTopic, selectedTopic);
  };

  const handleLanguageClick = (language: string): void => {
    handleFilterClick(language, setSelectedLanguage, selectedLanguage);
  };

  const handleLicenseClick = (license: string): void => {
    handleFilterClick(license, setSelectedLicense, selectedLicense);
  };

  const uniqueLanguages = useMemo(
    () => extractUniqueValues(filteredAndSortedRepos, "language"),
    [filteredAndSortedRepos],
  );

  const uniqueLicenses = useMemo(
    () => extractUniqueValues(filteredAndSortedRepos, "license", "spdx_id"),
    [filteredAndSortedRepos],
  );

  const uniqueTopics = useMemo(() => {
    const topicSet = new Set<string>();
    filteredAndSortedRepos.forEach((repo: GitHubRepo) => {
      if (Array.isArray(repo.topics)) {
        repo.topics.forEach((topic: string) => topicSet.add(topic));
      }
    });
    return Array.from(topicSet);
  }, [filteredAndSortedRepos]);

  return (
    <>
      <Box className="flex w-full flex-col gap-3">
        <FilterBar
          setFilterValue={setFilterValue}
          sort={sort}
          setSort={setSort}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          uniqueLanguages={uniqueLanguages}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          uniqueTopics={uniqueTopics}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          uniqueLicenses={uniqueLicenses}
          selectedLicense={selectedLicense}
          setSelectedLicense={setSelectedLicense}
        />
        {loading && (
          <Box className="flex w-full items-center justify-center">
            <Loading />
          </Box>
        )}
        <VList
          style={{
            height: "85vh",
          }}
        >
          {Array.isArray(filteredAndSortedRepos) &&
            filteredAndSortedRepos.map((repo, index) => (
              <ReposCard
                key={index}
                repo={repo}
                index={index}
                selectedLanguage={selectedLanguage}
                selectedLicense={selectedLicense}
                selectedTopic={selectedTopic}
                handleTopicClick={handleTopicClick}
                handleLanguageClick={handleLanguageClick}
                handleLicenseClick={handleLicenseClick}
              />
            ))}
        </VList>
      </Box>
    </>
  );
}
