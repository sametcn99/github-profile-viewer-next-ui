import React from "react";
import { useContext, useMemo, useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import { FaCodeFork } from "react-icons/fa6";
import { GithubContext } from "@/app/context/context";
import FilterInput from "../FilterInput";
import Loading from "@/app/loading";
import { formatNumber } from "@/lib/utils";
import {
  Box,
  Button,
  Card,
  DropdownMenu,
  Heading,
  Link,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import Readme from "./Readme";
import { sortByKeyAscending, sortByKeyDescending } from "@/lib/utils/sort";
import FilterBar from "./FilterBar";

export default function ReposCard({
  repo,
  index,
  selectedLanguage,
  selectedLicense,
  selectedTopic,
  handleTopicClick,
  handleLanguageClick,
  handleLicenseClick,
}: any) {
  return (
    <Card key={index}>
      <Box className="flex flex-row gap-4 ">
        <Box className="flex w-full flex-row items-center justify-between gap-2">
          <Box className="flex w-full flex-row  items-center gap-2 break-all text-start">
            <Heading>{repo.name}</Heading>
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
                  />
                </Box>
              </Tooltip>
              {repo.stargazers_count > 0 && (
                <Tooltip content="Total Stars">
                  <Box className="flex flex-row gap-2">
                    <BsFillStarFill size={22} />
                    <Text>{formatNumber(repo.stargazers_count)}</Text>
                  </Box>
                </Tooltip>
              )}
            </Box>
          </Box>
          <Box>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button className="hover:cursor-pointer">Open</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <Link href={repo.html_url} target="_blank">
                    Github
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Link
                    href={repo.html_url.replace("github.com", "github.dev")}
                    target="_blank"
                  >
                    Github.DEV
                  </Link>
                </DropdownMenu.Item>
                {repo.home_page && (
                  <DropdownMenu.Item>
                    <Link
                      href={repo.home_page.replace("github.com", "github.dev")}
                      target="_blank"
                    >
                      Website
                    </Link>
                  </DropdownMenu.Item>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Box>
        </Box>
      </Box>
      <Box>
        <p>{repo.description}</p>
      </Box>
      <Box className="flex flex-col items-start">
        <Box className="item flex flex-col flex-wrap gap-1 text-left text-xs">
          <Text
            onClick={() => handleLicenseClick(repo.license?.spdx_id)}
            className={
              selectedLicense === repo.license?.spdx_id
                ? "font-bold hover:cursor-pointer"
                : "font-thin hover:cursor-pointer"
            }
          >
            {repo.license?.spdx_id}
          </Text>
          <Text
            onClick={() => handleLanguageClick(repo.language)}
            className={
              selectedLanguage === repo.language
                ? "font-bold hover:cursor-pointer"
                : "font-thin hover:cursor-pointer"
            }
          >
            {repo.language ? `Language: ${repo.language}` : null}
          </Text>
          <Text>
            Created at: {new Date(repo.created_at).toLocaleDateString()}
          </Text>
          <Text>
            Last update: {new Date(repo.pushed_at).toLocaleDateString()}
          </Text>
        </Box>
        <Box className="flex w-full flex-row flex-wrap justify-center gap-2">
          {repo.topics.map((topic: any, index: any) => (
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