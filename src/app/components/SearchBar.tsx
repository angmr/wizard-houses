// SearchBar Component
// 
// This is a reusable search bar component.
// It renders a styled input field inside a container div.
// 
// Props:
// - value: The current value of the input (string).
// - onChange: Function to call when the input changes (event handler).
// - placeholder: Placeholder text for the input (string).
// - className: Additional class names for the container.

"use client";
import React from "react";
import searchbarstyles from "./SearchBar.module.css";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}) => (
  <div className={searchbarstyles.searchbarcontainer}>
    <input
      className={`${className} ${searchbarstyles.input}`}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

export default SearchBar;