import { useContext } from "react";
import { SuggestionCard } from "../../Components/SuggestionCard/SuggestionCard";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import "./SearchPage.css";

export function SearchPage() {
  const {
    data: { users },
    setData,
  } = useContext(DataContext);
  const { user, token } = useContext(AuthContext);

  const getSuggestions = users.filter(
    ({ username }) => username !== user.username
  );
  return (
    <div className="suggestion-container">
      <h4>Suggestions</h4>
      <div className="user-list">
        {getSuggestions.map((obj) => (
          <SuggestionCard userObj={obj} />
        ))}
      </div>
    </div>
  );
}
