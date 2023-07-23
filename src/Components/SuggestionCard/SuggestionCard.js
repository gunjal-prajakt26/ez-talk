import { NavLink } from "react-router-dom";
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
        <NavLink className="username-link" to={`/profile/${user._id}`}>
          {" "}
          <img class="avtar" src={avatar} />{" "}
        </NavLink>
        <div className="suggestion-user-deatils">
          <NavLink className="username-link" to={`/profile/${user._id}`}>
            <p className="fullName"> {firstName + " " + lastName} </p>{" "}
          </NavLink>
          <NavLink className="username-link" to={`/profile/${user._id}`}>
            <p className="userName"> @ {username} </p>{" "}
          </NavLink>
        </div>{" "}
        <button className="btn-follow">Follow</button>
      </div>{" "}
    </div>
  );
}
