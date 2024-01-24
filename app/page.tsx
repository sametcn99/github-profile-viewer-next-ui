import { Section, Text } from "@radix-ui/themes";
import Rate from "../components/Rate";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import SearchBar from "@/components/Search";

export default function Home() {
  return (
    <>
      <Section className="flex flex-col items-center justify-center gap-4 py-8 text-center break-words md:py-10">
        <Text className="text-3xl font-bold">Github Profile Viewer</Text>
        <Text className="max-w-[50rem]">
          Welcome to the Github Profile Viewer, a dynamic web platform powered
          by Next.js and Radix UI. Explore GitHub and Gist profiles
          effortlessly, utilizing the GitHub REST API to retrieve comprehensive
          information. Discover a user&apos;s coding journey and contributions
          to the open-source community.
        </Text>
        <Rate />
        <Link
          href="https://chromewebstore.google.com/detail/gpv-opener/abgechjdbcnlcdcmhkaakobeoimjgkmb"
          target="_blank"
        >
          <Image
            width={180}
            height={40}
            src="/icons/chrome-extension-dark.png"
            alt="GPV Opener"
            className="transition-all duration-500 shadow-md shadow-gray-700 hover:scale-105"
            fetchPriority="high"
          />
        </Link>
      </Section>
    </>
  );
}
