import { Instagram, Search } from "lucide-react";
import { useContext, useState } from "react";
import { DataContext } from "../../Context/DataContext";
import { SuggestionCard } from "../SuggestionCard/SuggestionCard";
import "./Header.css";

export function Header() {
  const [input, setInput] = useState("");
  const {
    data: { users },
    setData,
    isLoad,
    isError,
  } = useContext(DataContext);

  const searchUsers = input
    ? users.filter(
        ({ firstName, lastName, username }) =>
          firstName.toLowerCase().includes(input.trim().toLowerCase()) ||
          lastName.toLowerCase().includes(input.trim().toLowerCase()) ||
          username.toLowerCase().includes(input.trim().toLowerCase())
      )
    : [...users];

  return (
    <div className="header-container">
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <p class="header-title"><Instagram color="#0277bd" size={36} strokeWidth={2.25} />{" "}i-Gram</p>
          {/* <form class="d-flex" role="search"> */}
          <div className="search-container">
          <span className="search-icon"><Search size={30} strokeWidth={2.5} /></span>
            <input
              class="form-control me-2 "
              type="search"
              placeholder="Search..."
              aria-label="Search"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <div
              class="search-result"
              style={{ display: input.length ? "block" : "none" }}
            >
              <div className="user-list">
                {searchUsers.length > 0 ? (
                  searchUsers.map((obj) => <SuggestionCard userObj={obj} setInput={setInput} />)
                ) : (
                  <h5 style={{textAlign:"center"}}>No user Found.</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
