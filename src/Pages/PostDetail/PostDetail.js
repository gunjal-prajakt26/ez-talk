import { useContext } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { Avtar } from "../../Components/Avtar/Avtar";
import { Comment } from "../../Components/Comment/Comment";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import { addToBookmark, isPostBookmarked, removeFromBookmark } from "../../utils/bookMarkService";
import { isPostLiked,likePost,dislikePost } from "../../utils/likeDislikeService";

export function PostDetail() {
  const { postId } = useParams();
  const {
    data: { users, allPosts,bookmarks },
    setData,
  } = useContext(DataContext);
  const { user } = useContext(AuthContext);
  const post = allPosts.find(({ _id }) => _id === postId);
  const getUser = users.find((obj) => obj.username === post.username);
  const prevLocation= useLocation();
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(prevLocation?.state?.from?.pathname)
}
  
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

  const bookmarkHandler = () => {
    isPostBookmarked(_id, bookmarks)
    ?removeFromBookmark(post._id, setData)
    :addToBookmark(post._id, setData);
  };

  const likeHandler = () => {
    isPostLiked(post, user)
    ?dislikePost(post._id, setData)
    :likePost(post._id, setData)
  };

  const id = users.filter(({ username }) => username === post.username);

  return (
    <div className="home-page">
      <div className="heading-container">
        <sapn className="back-icon" onClick={navigateBack}>
          <i class="bi bi-arrow-left"></i>
        </sapn>
        <div className="profile-heading">
          <h1 className="home-title">Post</h1>
        </div>
      </div>
      <div className="post-container">
        <NavLink className="username-link" to={`/profile/${getUser._id}`} state={{ from: prevLocation }}>
          {" "}
          <Avtar postUsername={username} />
        </NavLink>
        <div className="post-content-1">
          <div className="post-user-data">
            <div className="user-info">
              <div className="user-details">
                <NavLink
                  className="username-link"
                  to={`/profile/${getUser._id}`} state={{ from: prevLocation }}
                >
                  <p className="fullName">{name}</p>
                </NavLink>
                <NavLink
                  className="username-link"
                  to={`/profile/${getUser._id}`} state={{ from: prevLocation }}
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
          <p className="icon-list" onClick={() => likeHandler()}>
          {isPostLiked(post, user)
          ?<i class="bi bi-suit-heart-fill post-icons" style={{color:"red"}}></i>
          :<i class="bi bi-suit-heart post-icons"></i>
          }
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
          {isPostBookmarked(_id, bookmarks) 
          ?<i class="post-icons bi bi-bookmark-fill"></i>
          :<i class="post-icons bi bi-bookmark"></i>
          }
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
