import { formatNumber } from "@/lib/utils";
import {
  Box,
  Card,
  Heading,
  Link,
  Text,
  Tooltip
} from "@radix-ui/themes";
import { BsFillStarFill } from "react-icons/bs";
import { FaCodeFork } from "react-icons/fa6";
import { GoLaw } from "react-icons/go";
import { TfiWorld } from "react-icons/tfi";
import Readme from "../Readme";
import { languageIcons } from "../icons/LanguageIcons";
import StarHistory from "../stats/Charts/StarHistory";

interface ReposCardProps {
  repo: GitHubRepo;
  index: number;
  selectedLanguage: string;
  selectedLicense: string;
  selectedTopic: string;
  handleTopicClick: (topic: string) => void;
  handleLanguageClick: (language: string) => void;
  handleLicenseClick: (license: string) => void;
}

export default function ReposCard({
  repo,
  index,
  selectedLanguage,
  selectedLicense,
  selectedTopic,
  handleTopicClick,
  handleLanguageClick,
  handleLicenseClick,
}: ReposCardProps) {
  return (
    <Card key={index}>
      <Box className="flex flex-row gap-4 ">
        <Box className="flex w-full flex-row flex-wrap items-center gap-2 break-all text-start">
          <Heading>
            <Link href={repo.html_url} target="_blank">
              {repo.name}
            </Link>
          </Heading>
          <Box className="flex w-fit flex-row flex-wrap items-center justify-start gap-2">
            {repo.fork && (
              <Tooltip content="Forked Repo">
                <Box>
                  <FaCodeFork size={22} />
                </Box>
              </Tooltip>
            )}
            <Tooltip content="Show Readme">
              <Box className="flex flex-row items-center gap-2">
                <Readme
                  url={`https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/master/README.md`}
                >
                  <span></span>
                </Readme>
              </Box>
            </Tooltip>
            {repo.homepage && (
              <Tooltip content="Home Page">
                <Link href={repo.homepage} target="_blank">
                  <TfiWorld size={22} color="white" />
                </Link>
              </Tooltip>
            )}
            {repo.stargazers_count > 0 && (
              <Tooltip content="Total Stars">
                <Box className="flex flex-row gap-2">
                  <BsFillStarFill size={22} />
                  <Text>{formatNumber(repo.stargazers_count)}</Text>
                </Box>
              </Tooltip>
            )}
            {repo.stargazers_count > 0 && (
              <StarHistory
                username={repo.owner.login}
                repo={repo.name}
                option="stargazers"
              />
            )}
          </Box>
        </Box>
      </Box>
      <Box>
        <p>{repo.description}</p>
      </Box>
      <Box className="flex flex-col items-start">
        <Box className="item flex flex-col flex-wrap gap-1 text-left text-xs">
          {repo.license?.spdx_id && (
            <Text
              onClick={() => handleLicenseClick(repo.license?.spdx_id)}
              className={
                selectedLicense === repo.license?.spdx_id
                  ? "flex scale-105 flex-row items-center gap-2 font-bold hover:cursor-pointer"
                  : "flex flex-row items-center gap-2 font-thin hover:cursor-pointer"
              }
            >
              <GoLaw /> {repo.license?.spdx_id}
            </Text>
          )}
          {repo.language && (
            <>
              {repo.language && languageIcons[repo.language] ? (
                // Display icon if available
                <Tooltip content={`Language: ${repo.language}`}>
                  <Box
                    onClick={() => handleLanguageClick(repo.language)}
                    className={
                      selectedLanguage === repo.language
                        ? "flex scale-105 flex-row items-center gap-2 font-bold hover:cursor-pointer"
                        : "flex flex-row items-center gap-2 font-thin hover:cursor-pointer"
                    }
                  >
                    {languageIcons[repo.language]}
                    <Text>{repo.language}</Text>
                  </Box>
                </Tooltip>
              ) : (
                // Display language name if icon is not available
                <Text
                  className={
                    selectedLanguage === repo.language
                      ? "flex scale-105 flex-row items-center gap-2 font-bold hover:cursor-pointer"
                      : "flex flex-row items-center gap-2 font-thin hover:cursor-pointer"
                  }
                  onClick={() => handleLanguageClick(repo.language)}
                >
                  Language: {repo.language}
                </Text>
              )}
            </>
          )}
          <Text>Last update: {new Date(repo.pushed_at).toUTCString()}</Text>
          <Text>Created at: {new Date(repo.created_at).toUTCString()}</Text>
        </Box>
        <Box className="flex w-full flex-row flex-wrap justify-center gap-2">
          {repo.topics.map((topic: string, index: number) => (
            <Text
              size="2"
              key={index}
              className={
                // Bold selected topic
                selectedTopic === topic
                  ? "mb-1 select-none rounded-2xl p-1 font-bold hover:cursor-pointer"
                  : "mb-1 select-none rounded-2xl p-1  font-thin hover:cursor-pointer"
              }
              onClick={() => handleTopicClick(topic)} // Add click handler
            >
              {topic}
            </Text>
          ))}
        </Box>
      </Box>
    </Card>
  );
}
