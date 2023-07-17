import { useContext } from "react";
import { SuggestionCard } from "../../Components/SuggestionCard/SuggestionCard";
import { DataContext } from "../../Context/DataContext";
import "./SearchPage.css";

export function SearchPage() {
  const {
    data: { users },
    setData,
  } = useContext(DataContext);
  return (
    <div className="suggestion-container">
      <h4>Suggestions</h4>
      <div className="user-list">
        {users.map((obj) => (
          <SuggestionCard user={obj} />
        ))}
      </div>
    </div>
  );
}
