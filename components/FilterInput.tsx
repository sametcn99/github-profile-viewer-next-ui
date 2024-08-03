import { TextField } from "@radix-ui/themes";

export default function FilterInput({
  setFilterValue,
}: {
  setFilterValue: (value: string) => void;
}) {
  return (
    <div className="w-full">
      <TextField.Root
        placeholder="Filter by title"
        type="search"
        onChange={(e) => setFilterValue(e.target.value)}
      />
    </div>
  );
}
