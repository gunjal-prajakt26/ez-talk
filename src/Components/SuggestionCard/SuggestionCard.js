import { Avtar } from "../Avtar/Avtar";
import "./SuggestionCard.css";

export function SuggestionCard({ user }) {
  const {
    _id,
    firstName,
    lastName,
    username,
    password,
    avatar,
    header,
    followers,
    following,
    bookmarks,
    bio,
    website,
    location,
    createdAt,
    updatedAt,
  } = user;
  return (
    <div>
      <div class="suggestion-user-conatiner">
        <img class="avtar" src={avatar} />{" "}
        <div className="suggestion-user-deatils">
          <p className="fullName"> {firstName + " " + lastName} </p>{" "}
          <p className="userName"> @ {username} </p>{" "}
        </div>{" "}
        <button className="btn-follow">Follow</button>
      </div>{" "}
    </div>
  );
}
