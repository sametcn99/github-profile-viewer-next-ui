"use client";
// gists component
import { useContext, useMemo, useState } from "react";
import { GithubContext } from "@/app/context/context";
import FilterInput from "./FilterInput";
import { Box, Button, Card, DropdownMenu, Link, Text } from "@radix-ui/themes";
import { FaGithub } from "react-icons/fa";
import { sortByKeyAscending, sortByKeyDescending } from "@/lib/utils/sort";
import { VList } from "virtua";
import Loading from "@/app/loading";
import { GitHubRepo } from "@/types/types";

// Gistss component
const Gists = () => {
  // State to store GitHub API data
  const { gists, loading } = useContext(GithubContext);
  const [filterValue, setFilterValue] = useState("");
  const [sort, setSort] = useState("Updated Descending");

  const filteredAndSortedGists = useMemo(() => {
    const filteredGists = gists
      ? gists.filter(
          (gist: GitHubRepo) =>
            gist.files &&
            Object.keys(gist.files).some((filename) =>
              filename.toLowerCase().includes(filterValue.toLowerCase()),
            ),
        )
      : [];

    switch (sort) {
      case "Created Ascending":
        return sortByKeyAscending(filteredGists, "created_at");

      case "Created Descending":
        return sortByKeyDescending(filteredGists, "created_at");

      case "Updated Ascending":
        return sortByKeyAscending(filteredGists, "updated_at");

      default:
        return sortByKeyDescending(filteredGists, "updated_at");
    }
  }, [gists, sort, filterValue]);

  return (
    <>
      <Box className="flex flex-col gap-3">
        <Box className="flex flex-row gap-3">
          <FilterInput setFilterValue={setFilterValue} />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="hover:cursor-pointer">
              <Button>Sort By</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Sort by</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.RadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenu.RadioItem value="Updated Descending">
                  Updated Descending
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Updated Ascending">
                  Updated Ascending
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Created Ascending">
                  Created Ascending
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Created Descending">
                  Created Descending
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>
        {loading && (
          <Box className="flex w-full items-center justify-center">
            <Loading />
          </Box>
        )}
        <VList
          style={{
            height: "90vh",
          }}
        >
          {Array.isArray(filteredAndSortedGists) &&
            filteredAndSortedGists.map((gist, index) => (
              <Card key={index}>
                <Box className="gap-4">
                  <Box className="flex flex-row flex-wrap items-center justify-between gap-2 break-all">
                    <Box className="flex flex-row flex-wrap items-start justify-start gap-2 break-all text-start">
                      <Box className="flex flex-col gap-2 break-all">
                        {Object.keys(gist.files).map((filename, index) => (
                          <Link
                            key={index}
                            href={gist.html_url}
                            target="_blank"
                          >
                            {filename}
                          </Link>
                        ))}
                      </Box>
                    </Box>
                    <Link
                      href={gist.html_url}
                      target="_blank"
                      className="flex flex-row items-center justify-center gap-2 text-base"
                    >
                      <FaGithub size={22} /> <span>Source</span>
                    </Link>
                  </Box>
                </Box>
                <Box>
                  <Text>{gist.description}</Text>
                </Box>
                <Box className="flex flex-col items-start">
                  <Box className="item flex flex-col flex-wrap gap-1 text-left text-xs">
                    <Text>
                      {gist.language ? `Language: ${gist.language}` : null}
                    </Text>
                    <Text>
                      Created at:{" "}
                      {new Date(gist.created_at).toLocaleDateString()}
                    </Text>
                    <Text>
                      Last update:{" "}
                      {new Date(gist.updated_at).toLocaleDateString()}
                    </Text>
                  </Box>
                </Box>
              </Card>
            ))}
        </VList>
      </Box>
    </>
  );
};

export default Gists;
