import { useContext } from "react";
import { NavLink, useParams } from "react-router-dom";
import { Avtar } from "../../Components/Avtar/Avtar";
import { Comment } from "../../Components/Comment/Comment";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";

export function PostDetail() {
  const { postId } = useParams();
  const {
    data: { users, allPosts },
    setData,
    addToBookmark,
    removeFromBookmark,
    likePost,
    dislikePost,
  } = useContext(DataContext);
  const { user, token, setUser } = useContext(AuthContext);
  const post = allPosts.find(({ _id }) => _id === postId);
  const getUser = users.find((obj) => obj.username === post.username);
  console.log(post);
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

  const isPostBookmarked = (id, allPosts) => {
    return allPosts.bookmarks.find((_id) => _id === id) ? true : false;
  };

  const bookmarkHandler = () => {
    isPostBookmarked
      ? removeFromBookmark(post._id)
      : addToBookmark(post._id, token);
  };

  const likeHandler = () => {
    likePost(post._id, token);
  };

  const id = users.filter(({ username }) => username === post.username);

  return (
    <div className="home-page">
      <div className="heading-container">
        <sapn className="back-icon">
          <i class="bi bi-arrow-left"></i>
        </sapn>
        <div className="profile-heading">
          <h1 className="home-title">Post</h1>
        </div>
      </div>
      <div className="post-container">
        <NavLink className="username-link" to={`/profile/${getUser._id}`}>
          {" "}
          <Avtar postUsername={username} />
        </NavLink>
        <div className="post-content-1">
          <div className="post-user-data">
            <div className="user-info">
              <div className="user-details">
                <NavLink
                  className="username-link"
                  to={`/profile/${getUser._id}`}
                >
                  <p className="fullName">{name}</p>
                </NavLink>
                <NavLink
                  className="username-link"
                  to={`/profile/${getUser._id}`}
                >
                  <p className="userName">@{username}</p>
                </NavLink>
              </div>
              <p className="post-date">·{getPostedTime()}</p>
            </div>
          </div>
          <div className="post-data">
            <p className="content">{post?.content}</p>
            {post?.mediaURL && <img className="post-img" src={mediaURL} />}
          </div>
          <div className="icon-container">
            <p className="icon-list">
              <i
                class="post-icons bi bi-heart"
                onClick={() => likeHandler()}
              ></i>{" "}
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
            <p className="icon-list" onClick={() => bookmarkHandler()}>
              <i
                class="post-icons bi bi-bookmark-fill"
                style={{ color: isPostBookmarked ? "black" : "white" }}
              ></i>
            </p>
          </div>
          <div className="comments">
            <div className="new-comment">
              <div className="modal-content">
                <div className="post-comment">
                  <Avtar postUsername={user.username} />
                  <div class="post-content">
                    <input
                      type="text"
                      class="form-control input-text"
                      placeholder="Write comment..."
                    />
                  </div>
                  <button className="btn-follow">Post</button>
                </div>
              </div>
            </div>
            <div>
              {comments.map((obj) => (
                <Comment comments={obj} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
