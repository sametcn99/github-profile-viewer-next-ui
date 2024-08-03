import Link from "next/link";
import LoginControl from "./auth/LoginControl";
import SearchBar from "./Search";

const Navbar = () => {
  return (
    <nav className="inline-flex w-full place-items-center justify-between pt-2">
      <Link
        href="/"
        className="text-2xl font-bold text-zinc-400 hover:underline"
      >
        GPV
      </Link>
      <div className="inline-flex place-items-center gap-4">
        <LoginControl />
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
