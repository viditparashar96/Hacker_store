import React from "react";
import { Input } from "../ui/input";
interface SearchBarProps {
  handleSearchFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
}
const SearchBar = ({ handleSearchFilter, type }: SearchBarProps) => {
  return (
    <Input
      type="email"
      className={`w-[300px] ${
        type === "mobile" ? "block md:hidden w-full mt-2" : "hidden md:block"
      } `}
      placeholder="Search For Products...."
      onChange={handleSearchFilter}
    />
  );
};

export default SearchBar;
