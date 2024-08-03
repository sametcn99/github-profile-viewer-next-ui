import { clerkClient } from "@clerk/nextjs/server";
import { Octokit } from "octokit";

export default async function createOctokitInstance(userId?: string) {
  // set token in development mode
  let auth;

  if (process.env.NODE_ENV === "development")
    auth = process.env.GITHUB_TOKEN || "";

  if (
    userId !== null &&
    userId !== undefined &&
    process.env.NODE_ENV !== "development"
  ) {
    const user = await clerkClient.users.getUser(userId);
    auth = user.unsafeMetadata.token as string;
  }
  let octokit = new Octokit({
    auth: auth,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return octokit;
}
