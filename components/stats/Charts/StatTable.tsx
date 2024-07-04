import { GithubContext } from "@/app/context/GithubContext";
import { StatsContext } from "@/app/context/StatsContext";
import "@/app/globals.css";
import { getProfileAge, getProfileAgeString } from "@/lib/utils";
import { Card, Grid, Heading, Text } from "@radix-ui/themes";
import { useContext } from "react";

export default function StatTable({}: {}) {
  const statsContext = useContext(StatsContext);
  const userContext = useContext(GithubContext);
  const {
    totalRepos,
    totalForks,
    totalStars,
    totalGists,
    averageStarsPerRepo,
    totalTopics,
    totalArchived,
  } = statsContext ?? {};
  const { user } = userContext;
  return (
    <Card className="">
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Profile Age</Heading>
        <Text>
          {getProfileAgeString(
            new Date(user?.created_at ? user?.created_at : ""),
          )}{" "}
        </Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Total Repositories</Heading>
        <Text>{totalRepos}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Total Gists</Heading>
        <Text>{totalGists}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Total Stars</Heading>
        <Text>{totalStars ?? 0}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Total Forks</Heading>
        <Text>{totalForks}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Total Topics</Heading>
        <Text>{totalTopics ?? 0}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Total Archived Repositories</Heading>
        <Text>{totalArchived}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Average Stars Per Repository</Heading>
        <Text>{averageStarsPerRepo?.toFixed(2)}</Text>
      </Grid>
    </Card>
  );
}
