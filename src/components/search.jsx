import { useState } from "react";

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const searchCover = document.getElementById("search-cover");

  // Handle the search cover visibility based on the search bar state
  if (isOpen) {
    searchCover.classList.add("show");
    document.body.style.overflow = `hidden`;
  } else {
    searchCover.classList.remove("show");
    document.body.style.overflow = `visible`;
  }

  return (
    <div className="search-bar">
      {isOpen && <input type="text" placeholder="Search..." autoFocus />}
      <span className="fa fa-search" onClick={() => setIsOpen(!isOpen)}></span>
    </div>
  );
}
