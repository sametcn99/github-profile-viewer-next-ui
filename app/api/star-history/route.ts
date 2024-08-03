import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import createOctokitInstance from "../../../lib/createOctokitInstance";

/**
 * Fetches stargazers for a GitHub repo from the GitHub API.
 *
 * @param username The repo owner's username
 * @param repo The repo name
 * @param page The page number of stargazers to retrieve
 * @returns A promise resolving to the array of stargazer records for the requested page
 */
async function fetchStargazers(username: string, repo: string, page: number) {
  const { userId } = auth();
  const octokit = await createOctokitInstance(userId ? userId : undefined);
  const responseData = await octokit.rest.activity.listStargazersForRepo({
    owner: username,
    repo: repo,
    per_page: 100,
    page: page,
    headers: {
      accept: "application/vnd.github.star+json",
    },
  });
  return responseData.data;
}

/**
 * Fetches stargazer history for a GitHub repo.
 *
 * Accepts the repo owner username, repo name, and "stargazers" option in the request URL.
 * Uses the GitHub API to get all pages of stargazers for the repo.
 * Returns a JSON response containing an array of stargazer records with just the starred_at timestamp.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const repo = searchParams.get("repo");
  const option = searchParams.get("option");
  const { userId } = auth();

  if (username && repo && option === "stargazers") {
    let responseData = [];
    let octokit = await createOctokitInstance(userId ? userId : undefined);

    const initialResponse = await octokit.rest.activity.listStargazersForRepo({
      owner: username,
      repo: repo,
      per_page: 100,
      headers: {
        accept: "application/vnd.github.star+json",
      },
    });

    let linkHeader = initialResponse.headers.link;
    let lastPageNumber = 1;

    if (linkHeader) {
      var links = linkHeader.split(",");
      var lastPageLink = links.find((link) => link.includes('rel="last"'));
      var urlPattern = /<([^>]+)>/;
      var urlMatch = lastPageLink?.match(urlPattern);
      var url = urlMatch ? urlMatch[1] : null;
      var urlObject = new URL(url ? url : "");
      lastPageNumber = Number(urlObject.searchParams.get("page"));
    }

    const promises = [];
    for (let page = 1; page <= lastPageNumber; page++) {
      promises.push(fetchStargazers(username, repo, page));
    }

    try {
      responseData = (await Promise.all(promises)).flat();
      responseData = responseData.map((star) => ({
        starred_at: star.starred_at,
      }));
    } catch (error) {
      console.error("Error fetching stargazers:", error);
      return NextResponse.error();
    }

    return NextResponse.json(responseData);
  }
}
