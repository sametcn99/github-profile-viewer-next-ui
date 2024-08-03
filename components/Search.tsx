"use client";
import { useEffect, useMemo, useState } from "react"; // Import useState hook
import { useRouter } from "next/navigation";
import { cn, getSiteUrl } from "@/lib/utils";
import {
  Link,
  TextField,
  Avatar,
  Dialog,
  Button,
  Text,
  Box,
  DropdownMenu,
} from "@radix-ui/themes";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";
import { VList } from "virtua";

export default function SearchBar({ className }: { className?: string }) {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<UserData[] | []>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const router = useRouter();
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      searchHandle();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const searchHandle = () => {
    router.push(`/${inputValue}`);
  };

  const fetchData = debounce(async () => {
    if (inputValue.trim() === "") {
      setData([]);
      return;
    }
    try {
      const url = `${getSiteUrl()}/api/github?option=search&username=${inputValue}`;
      const response = await fetch(url, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`HTTP error! Status code: ${response.status}`);
      }
      const fetchedData = await response.json();
      setData(fetchedData.data.items);
    } catch (error) {
      console.error("Could not fetch data:", error);
    }
  }, 100);

  useEffect(() => {
    fetchData();
    return () => {
      fetchData.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  // Filter data
  const filteredData = useMemo(() => {
    return data.filter((item: UserData) => {
      const loginMatches = item.login
        .toLowerCase()
        .includes(inputValue.toLowerCase());
      if (selectedFilter === "All") {
        return loginMatches;
      } else {
        return (
          item.type.toLowerCase() === selectedFilter.toLowerCase() &&
          loginMatches
        );
      }
    });
  }, [data, inputValue, selectedFilter]);

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className={cn("hover:cursor-pointer hover:underline", className)}
      >
        <Button>
          <FaSearch />
          Search User
        </Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title className="flex w-full flex-row justify-between">
          <Dialog.Close>
            <Box className="flex w-full flex-row items-center justify-between gap-3">
              <Text>Search</Text>
              <Button
                variant="soft"
                color="gray"
                className="hover:cursor-pointer"
              >
                Close
              </Button>
            </Box>
          </Dialog.Close>
        </Dialog.Title>

        <Box className="static flex flex-col items-center justify-center gap-5 ">
          <Box className="flex w-full flex-row items-center justify-between gap-3">
            <TextField.Root
              size="3"
              className="w-full"
              aria-label="Search"
              placeholder="Write user name"
              onKeyDown={handleKeyPress}
              onChange={handleChange}
            ></TextField.Root>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button className="hover:cursor-pointer">Filter By</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>Filter By</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.RadioGroup
                  value={selectedFilter}
                  onValueChange={setSelectedFilter}
                >
                  <DropdownMenu.RadioItem value="All">
                    All
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="User">
                    User
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="Organization">
                    Organization
                  </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Box>
          <VList style={{ height: 400 }}>
            {data &&
              data?.length > 0 &&
              filteredData.map((item: UserData, index: number) => (
                <Link
                  href={`/${item.login}`}
                  key={index}
                  className="flex flex-row items-center justify-start gap-2 rounded-3xl p-2 hover:bg-black hover:bg-opacity-50"
                >
                  <Avatar
                    size="3"
                    fallback={item.login.charAt(0)}
                    src={item.avatar_url || item.avatar_url}
                  />
                  <div className="flex flex-col text-start">
                    <span className="text-xl font-bold">{item.login}</span>
                    <span>{item.type}</span>
                  </div>
                </Link>
              ))}
          </VList>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  );
}
