import { BsFillStarFill } from "react-icons/bs";
import { FaCodeFork } from "react-icons/fa6";
import { formatNumber } from "@/lib/utils";
import {
  Box,
  Button,
  Card,
  DropdownMenu,
  Link,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import Readme from "./Readme";
export default function Repository({ repo, index }: any) {
  return (
    <Card key={index}>
      <Box className="gap-4">
        <Box className="flex flex-row flex-wrap items-center justify-between gap-2">
          <Box className="flex flex-row flex-wrap items-start justify-start gap-2 break-all text-start">
            <Text className="md:break-normal break-all">{repo.name}</Text>
            {repo.fork && (
              <Tooltip content="Forked Repo">
                <Box>
                  <FaCodeFork size={22} />
                </Box>
              </Tooltip>
            )}
            <Tooltip content="Show Readme">
              <Box className="flex flex-row gap-2 items-center">
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
      <Box>
        <p>{repo.description}</p>
      </Box>
      <Box className="flex flex-col items-start">
        <Box className="item flex flex-col flex-wrap gap-1 text-left text-xs">
          <Text className={"font-thin hover:cursor-pointer"}>
            {repo.license?.spdx_id}
          </Text>
          <Text className={"font-thin hover:cursor-pointer"}>
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
                "mb-1 select-none rounded-2xl p-1  font-thin hover:cursor-pointer"
              }
            >
              {topic}
            </Text>
          ))}
        </Box>
      </Box>
    </Card>
  );
}
