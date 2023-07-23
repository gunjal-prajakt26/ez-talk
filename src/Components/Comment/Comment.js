import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import { Avtar } from "../Avtar/Avtar";
import "./Comment.css";

export function Comment({ comments }) {
  const {
    data: { users, allPosts },
    setData,
    addToBookmark,
    removeFromBookmark,
    likePost,
    dislikePost,
  } = useContext(DataContext);
  const { user, token, setUser } = useContext(AuthContext);
  const getUser = users.find((obj) => obj.username === comments.username);
  const { _id, name, username, text, votes } = comments;
  return (
    <div className="post-comment">
      <NavLink className="username-link" to={`/profile/${getUser._id}`}>
        {" "}
        <Avtar postUsername={username} />
      </NavLink>
      <div className="post-content-1">
        <div className="post-user-data">
          <div className="user-info">
            <div className="user-details">
              <NavLink className="username-link" to={`/profile/${getUser._id}`}>
                <p className="fullName">{name}</p>
              </NavLink>
              <NavLink className="username-link" to={`/profile/${getUser._id}`}>
                <p className="userName">@{username}</p>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="post-data">
          <p className="content">{comments?.text}</p>
        </div>
      </div>
    </div>
  );
}
