import { useContext } from "react";
import { DataContext } from "../../Context/DataContext";
import { Avtar } from "../Avtar/Avtar";
import "./Post.css";

export function Post({ post }) {
  const { data, setData } = useContext(DataContext);
  const {
    _id,
    content,
    likes,
    username,
    name,
    mediaURL,
    createdAt,
    updatedAt,
    comments,
  } = post;

  const getPostedTime = () => {
    const date = new Date(createdAt);
    const options = { month: "short", day: "numeric" };
    let formattedDate = date.toLocaleString("en-US", options);
    if (date.getFullYear() < 2023) {
      formattedDate += ", " + date.getFullYear();
    }
    return formattedDate;
  };

  return (
    <div className="post-container">
      <Avtar postUsername={username} />
      <div className="post-content">
        <div className="post-user-data">
          <div className="user-info">
            <div className="user-details">
              <p className="fullName">{name}</p>
              <p className="userName">@{username}</p>
            </div>
            <p className="post-date">·{getPostedTime()}</p>
          </div>
          <div class="dropdown-container">
            <span
              class="dropdown-icon"
              type="span"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-three-dots"></i>
            </span>
            <ul class="dropdown-menu">
              <li className="dropdown-item">Edit</li>
              <li className="dropdown-item">Delete</li>
            </ul>
          </div>
        </div>
        <div className="post-data">
          <p className="content">{post?.content}</p>
          {post?.mediaURL && <img className="post-img" src={mediaURL} />}
        </div>
        <div className="icon-container">
          <p className="icon-list">
            <i class="post-icons bi bi-heart"></i>{" "}
            <span className="counts">{likes.likeCount}</span>
          </p>
          <p className="icon-list">
            <i class="post-icons bi bi-chat-left"></i>{" "}
            <span className="counts">
              {comments.length ? comments.length : ""}
            </span>
          </p>
          <p className="icon-list">
            <i class="post-icons bi bi-share"></i>
          </p>
          <p className="icon-list">
            <i class="post-icons bi bi-bookmark"></i>
          </p>
        </div>
      </div>
    </div>
  );
}
