"use client";
import { getSiteUrl } from "@/lib/utils";
import { Button, DropdownMenu, Link } from "@radix-ui/themes";
import { useEffect, useState } from "react";

interface SocialLink {
  provider: string;
  url: string;
}

interface SocialLinksProps {
  username: string;
  option: string;
}
export default function SocialLinks({ username, option }: SocialLinksProps) {
  const [data, setData] = useState<SocialLink[]>([]);
  const url = `${getSiteUrl()}/api/github?username=${username}&option=${option}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, { next: { revalidate: 1000 } });
        if (!response.ok) {
          throw new Error(`HTTP error! Status code: ${response.status}`);
        }
        const fetchedData = await response.json();
        if (Array.isArray(fetchedData.data) && fetchedData.data.length > 0) {
          setData(fetchedData.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [username, url]);

  return (
    <>
      {data.length > 0 && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button className="hover:cursor-pointer">Links</Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            {data.map((item: SocialLink, index: number) => (
              <DropdownMenu.Item key={index} className="w-full">
                <Link href={item.url} target="_blank">
                  {" "}
                  {item.provider === "generic"
                    ? item.url.replace("https://", "").substring(0, 50)
                    : item.provider}{" "}
                </Link>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </>
  );
}