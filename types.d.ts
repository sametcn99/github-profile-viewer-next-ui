/**
 * Type definition for a GitHub repository.
 * Contains details like id, name, stargazer count, URLs,
 * creation/update dates, topics, license info, language,
 * file list, owner details, and other metadata.
 */
type GitHubRepo = {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
  homepage: string;
  description: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  archived: boolean;
  topics: string[];
  license_name: string;
  license_url: string;
  language: string;
  license_key: string;
  license: any;
  stars: number;
  home_page: string;
  license_spdx_id: string;
  files: string[];
  owner: any;
  [key: string]: any;
};

/**
 * UserData type definition for a GitHub user.
 * Contains details like name, login, avatar,
 * URLs, follower counts, etc.
 */
type UserData = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

/** SocialLink type definition for social media links associated with a GitHub user profile. */
type SocialLink = {
  provider: string;
  url: string;
};

type BlogPost = {
  id: string;
  title: string;
  date: string;
  description: string;
  author: string;
  keywords: string[];
};
