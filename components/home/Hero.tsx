import { Heading, Section, Text } from "@radix-ui/themes";
import SearchBar from "../Search";
import ChromeStore from "./ChromeStore";

export default function Hero() {
  return (
    <Section
      className="flex flex-col items-center justify-center gap-4 text-center"
      id="hero"
    >
      <Heading size="9" className="animated-header">
        Github Profile Viewer
      </Heading>
      <Text className="max-w-[50rem]">
        Explore GitHub and Gist profiles effortlessly, utilizing the GitHub REST
        API to retrieve comprehensive information.
      </Text>
      <SearchBar />
      <ChromeStore />
    </Section>
  );
}
