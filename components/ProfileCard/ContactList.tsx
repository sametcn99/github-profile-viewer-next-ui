"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchContact } from "@/lib/utils";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DropdownMenu,
  Text,
  TextField,
  Tooltip,
} from "@radix-ui/themes";
import Loading from "@/app/loading";
import { VList } from "virtua";
import { FaUser } from "react-icons/fa6";
import { BsInfoCircleFill } from "react-icons/bs";

export default function ContactList({
  username,
  option,
  count,
}: {
  username: string;
  option: string;
  count: number;
}) {
  // State to hold fetched data
  const [data, setData] = useState<UserData[]>([]);
  // State for filtering data based on user input
  const [filter, setFilter] = useState<string>("");
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to track the selected filter option
  const [selectedFilter, setSelectedFilter] = useState("All");
  // State to control the dialog open/close state
  const [dialogOpen, setDialogOpen] = useState(false);

  // Effect to fetch data when the dialog is open or when the username or option changes
  useEffect(() => {
    let isMounted = true; // Variable to check if the component is mounted
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      let allDataFetched = false;
      if (data.length > 0) return; // Return if data is already fetched
      let page = 1; // Initial page number

      setLoading(true); // Set loading to true when data fetching starts

      // Continue fetching data until all data is fetched or the component is unmounted
      while (!allDataFetched && isMounted) {
        try {
          // Fetch data for the current page
          const pageData = await fetchContact(username, option, page, signal);
          if (pageData.length === 0) {
            allDataFetched = true; // Assume all data is fetched if the page data is empty
          } else {
            page++; // Move to the next page
          }

          // Update data state with the fetched data
          if (isMounted) {
            setData((prevData) => [...prevData, ...pageData]);
          }
        } catch (error) {
          // Handle errors, log and stop the loop in case of an error
          if (isMounted) {
            if (error === "AbortError") {
              console.log("Fetch operation was aborted");
            } else {
              console.error("Error fetching data:", error);
            }
          }
          allDataFetched = true; // Stop the loop in case of an error
        }
      }
      setLoading(false); // Set loading to false when data fetching is complete
    };

    // Fetch data only when the dialog is open
    if (dialogOpen) {
      fetchData();
    }

    // Cleanup function to handle component unmounting
    return () => {
      isMounted = false; // Unmount the component
      abortController.abort(); // Abort ongoing requests
    };
  }, [dialogOpen, username, option, data.length]);

  // Filter data based on user input and selected filter option
  const filteredData = data.filter((item: UserData) => {
    const loginMatches = item.login
      .toLowerCase()
      .includes(filter.toLowerCase());

    if (selectedFilter === "All") {
      return loginMatches;
    } else {
      return (
        item.type.toLowerCase() === selectedFilter.toLowerCase() && loginMatches
      );
    }
  });

  // JSX for rendering the component
  return (
    <>
      <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
        <Dialog.Trigger>
          <Button className="hover:cursor-pointer">
            <Text className="flex items-center gap-2">
              {count > 1000 && (
                <Tooltip
                  content={`User have more than 1000 ${option.charAt(0).toUpperCase()}${option.slice(1)}. If you open dialog, the application send
                  request for every 100 user.`}
                >
                  <Box className="flex flex-row items-center">
                    <BsInfoCircleFill />
                  </Box>
                </Tooltip>
              )}
              <FaUser />
              {option.charAt(0).toUpperCase()}
              {option.slice(1)}
            </Text>
            <Text> {count}</Text>
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title className="flex w-full flex-row justify-between">
            <Box className="flex w-full flex-row items-start justify-between">
              <div> Users </div>
              <Dialog.Close>
                <Button className="cursor-pointer hover:underline">
                  Close
                </Button>
              </Dialog.Close>
            </Box>
          </Dialog.Title>
          {/* Textfield for filtering by name */}
          <TextField.Root>
            <TextField.Input
              value={filter}
              type="search"
              placeholder="Filter by name"
              onChange={(e) => setFilter(e.target.value)}
            ></TextField.Input>
            {/* Dropdown for selecting the filter option */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button className="hover:cursor-pointer">Filter By</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>Filter By</DropdownMenu.Label>
                <DropdownMenu.Separator />
                {/* Radio group for filter options */}
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
          </TextField.Root>
          {/* Display loading indicator if data is still being fetched */}
          {loading && <Loading />}
          {/* Virtualized list for rendering user data */}
          <VList
            style={{
              height: "50vh",
              marginTop: "20px",
            }}
          >
            {Array.isArray(filteredData) && filteredData?.length > 0 ? (
              filteredData.map((item: UserData, index: number) => (
                // Link to user profile page
                <Link
                  key={index}
                  href={`/${item.login}`}
                  className="flex flex-row items-center gap-2 rounded-2xl p-2 hover:bg-black hover:bg-opacity-50"
                >
                  {/* Display user avatar or fallback icon */}
                  <Avatar
                    fallback={item.login.charAt(0)}
                    src={item.avatar_url || item.avatar_url}
                  />
                  {/* Display user information */}
                  <Box className="flex flex-col">
                    <Text className="text-xl font-bold"> {item.login}</Text>
                    <Text> {item.type}</Text>
                  </Box>
                </Link>
              ))
            ) : (
              // Display a message if no matching data is found
              <>{!loading && <Text>No matching data found.</Text>}</>
            )}
          </VList>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
