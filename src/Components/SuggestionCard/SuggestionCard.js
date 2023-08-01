import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import { follow, isFollowing, unfollow } from "../../utils/followUnfollow";
import "./SuggestionCard.css";

export function SuggestionCard({ userObj, setInput}) {
  const { user,setUser } = useContext(AuthContext);
    const { setData } = useContext(DataContext);
    const prevLocation= useLocation();
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
  } = userObj;

  const clickHandler=()=>{
    setInput?.(()=>"");
  }
  return (
    <div>
      <div class="suggestion-user-conatiner">
          
        <NavLink className="username-link" to={`/profile/${userObj._id}`} state={{ from: prevLocation }}>
          {" "}
          <img class="avtar" src={avatar} onClick={()=>clickHandler()}/>{" "}
        </NavLink>
        <div className="suggestion-user-deatils">
          <NavLink className="username-link" to={`/profile/${userObj._id}`} state={{ from: prevLocation }}>
            <p className="fullName" onClick={()=>clickHandler()}> {firstName + " " + lastName} </p>{" "}
          </NavLink>
          <NavLink className="username-link" to={`/profile/${userObj._id}`} state={{ from: prevLocation }}>
            <p className="userName" onClick={()=>clickHandler()}> @ {username} </p>{" "}
          </NavLink>
        </div>{" "}
        { isFollowing(userObj._id, user) ? (
          <button
            className="btn-unfollow"
            onClick={() => unfollow(_id, setData, setUser)}
          >
            Following
          </button>
        ) : (
          <button
            className="btn-follow"
            onClick={() => follow(_id, setData, setUser)}
          >
            Follow
          </button>
        )}
      </div>{" "}
    </div>
  );
}
