import { Card, Heading, Text, Box, Section } from "@radix-ui/themes";

const featureTexts = [
  {
    header: "Effortless Navigation",
    span: "Github Profile Viewer ensures effortless navigation through GitHub profiles. Whether you're a seasoned open-source enthusiast or a curious observer, the user-friendly interface simplifies the exploration process.",
  },
  {
    header: "Detailed Repository Insights",
    span: "Gain in-depth insights into repositories, including names and descriptions. Explore the coding projects that define a developer's journey, all presented in a clear and organized manner.",
  },
  {
    header: "Explore Connections",
    span: "Efficiently explore a user's network by checking their followers and those they follow. Identify key contributors in the open-source community and broaden your connections effortlessly.",
  },
  {
    header: "Star History",
    span: "While not offering a detailed commit history, Github Profile Viewer showcases the star history of repositories. Understand which projects have garnered attention and appreciation, providing insights into a developer's impact on the GitHub community.",
  },
  {
    header: "Created with Next.js",
    span: "Github Profile Viewer is powered by Next.js, ensuring optimized performance and a seamless user experience. Enjoy fast-loading pages and real-time data retrieval for efficient exploration.",
  },
  {
    header: "Responsive Design with Radix UI",
    span: "The integration of Radix UI guarantees a responsive design, allowing you to explore GitHub profiles across various devices. Whether on desktop or mobile, the experience remains smooth and consistent.",
  },
];

export default function Features() {
  return (
    <Section className="flex flex-col items-center gap-4" id="features">
      <Heading size="8" className="text-3xl font-bold">
        Features
      </Heading>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {featureTexts.map((feature, index) => (
          <Card className="p-4" key={index}>
            <Heading>{feature.header}</Heading>
            <Text>{feature.span}</Text>
          </Card>
        ))}
      </div>
    </Section>
  );
}
