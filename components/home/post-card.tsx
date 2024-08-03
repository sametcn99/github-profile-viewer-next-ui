// Import the 'Link' component from 'next/link' and the 'getFormattedDate' function
import getFormattedDate from "@/lib/utils";
import Link from "next/link";

// Define the 'Props' type for the 'PostCard' component
type Props = {
  post: BlogPost;
};

// Define and export the 'PostCard' component
export default function PostCard({ post }: Props, index: number) {
  // Destructure properties from the 'post' object
  const { id, title, date, description } = post;

  // Format the date using the 'getFormattedDate' function
  const formattedDate = getFormattedDate(date);

  // Limit the description to 300 characters, adding an ellipsis if it's longer
  const limitedDescription =
    description.length > 300 ? description.slice(0, 400) + "..." : description;

  return (
    // Create a container div with a hover effect
    <>
      {/* Create a link to the post's detail page using 'Link' */}
      <Link href={"/blog/" + id}>
        <div className="h-fit w-full py-4 hover:pl-2">
          <span className="text-xl font-semibold"> {title}</span>
          <br />
          {/* Display the formatted date */}
          <span className="font-thin">{formattedDate}</span>
          <br />
          {/* Display the limited description */}
          {limitedDescription}
          {/* Create a link to the post's detail page */}
        </div>
      </Link>
    </>
  );
}
