"use client";
import { getSiteUrl } from "@/lib/utils";
import { GitHubRepo } from "@/types/types";
import { createContext, ReactNode, useState, useEffect } from "react";

// Define the structure of the context data
export type GithubContextProps = {
  repos: GitHubRepo[] | [];
  gists: GitHubRepo[] | [];
  loading: boolean;
};

// Create a context with the defined structure
export const GithubContext = createContext<GithubContextProps>({
  repos: [],
  gists: [],
  loading: false,
});

// Create a provider component for the GitHub context
export const GithubProvider = ({
  children,
  username,
  repoCount,
  gistCount,
}: {
  children: ReactNode;
  username: string;
  repoCount: number;
  gistCount: number;
}) => {
  const [repos, setRepos] = useState<GitHubRepo[] | []>([]);
  const [gists, setGists] = useState<GitHubRepo[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true); // Initialize loading state to true

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getSiteUrl()}/api/new?username=${username}&option=repos&repoCount=${repoCount}&gistCount=${gistCount}`,
        );
        const data = await response.json();
        setRepos(data.repos);
        setGists(data.gists);
        setLoading(false); // Set loading to false when data is successfully fetched
        console.log(data);
      } catch (error) {
        setLoading(false); // Set loading to false in case of an error
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchData();
  }, [gistCount, repoCount, username]);

  // Create the context value object
  const contextValue: GithubContextProps = {
    repos,
    gists,
    loading,
  };

  // Provide the context value to the child components
  return (
    <GithubContext.Provider value={contextValue}>
      {children}
    </GithubContext.Provider>
  );
};
