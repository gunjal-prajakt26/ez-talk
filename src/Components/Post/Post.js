import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import { addToBookmark, isPostBookmarked, removeFromBookmark } from "../../utils/bookMarkService";
import { deletePost } from "../../utils/editDeletePost";
import { follow, isFollowing, unfollow } from "../../utils/followUnfollow";
import { isPostLiked, likePost,dislikePost } from "../../utils/likeDislikeService";
import { Avtar } from "../Avtar/Avtar";
import { EditPostModal } from "../PostModal/EditPostModal";
import "./Post.css";

export function Post({ post }) {
  const {
    data: { users,bookmarks },
    setData,
  } = useContext(DataContext);
  const { user, token, setUser } = useContext(AuthContext);
const location= useLocation();
const [editModal, setEditModal]= useState(false);

  const getUser= users.find((obj)=>obj.username === post.username);
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

  const id = users.find(({ username }) => username === post.username)._id;
  
  const editingPostId= post?._id
  return (
    <div className="post-container">
      <NavLink className="username-link" to={`/profile/${getUser._id}`}>
        {" "}
        <Avtar postUsername={username} />
      </NavLink>
      <div className="post-content-1">
        <div className="post-user-data">
          <div className="user-info">
            <div className="user-details">
              <NavLink className="username-link" to={`/profile/${getUser._id}`} state={{ from: location }}>
                <p className="fullName">{getUser.firstName+" "+getUser.lastName}</p>
              </NavLink>
              <NavLink className="username-link" to={`/profile/${getUser._id}`} state={{ from: location }}>
                <p className="userName">@{username}</p>
              </NavLink>
            </div>
            <p className="post-date">·{getPostedTime()}</p>
          </div>
          {username === user.username ? (
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
                <span
                  className="dropdown-item"
                  onClick={()=>setEditModal(true)}
                >
                  Edit
                </span>
                <li
                  className="dropdown-item"
                  onClick={() => deletePost(post._id, setData,token)}
                >
                  Delete
                </li>
              </ul>
            </div>
          ) : (
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
                {isFollowing(id, user) ? (
                  <li
                    className="dropdown-item"
                    onClick={() => unfollow(id, setData, setUser)}
                  >
                    Unfollow
                  </li>
                ) : (
                  <li
                    className="dropdown-item"
                    onClick={() => follow(id, setData, setUser)}
                  >
                    Follow
                  </li>
                )}
              </ul>
            </div>
          )}
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
          <NavLink className="username-link" to={`/postDetail/${_id}`} state={{ from: location }}>
            <i class="post-icons bi bi-chat-left"></i></NavLink>{" "}
            <span className="counts">
              {comments ? comments.length : ""}
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
      </div>
      {editModal && <EditPostModal
        editingPostId={editingPostId}
        setEditModal={setEditModal}
        />
      }
    </div>
  );
}
