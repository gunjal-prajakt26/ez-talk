import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Post } from "../../Components/Post/Post";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import { follow, isFollowing, unfollow } from "../../utils/followUnfollow";
import { UserCog } from "lucide-react";
import "./Profile.css";
import { EditProfile } from "../../Components/EditProfile/EditProfile";

export function Profile() {
  const { id } = useParams();
  const prevLocation = useLocation();
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate(prevLocation?.state?.from?.pathname)
}
const {
  data: { allPosts, users },
  setData,
  isLoad,
  isError,
} = useContext(DataContext);
const { user, setUser,logOutHandler } = useContext(AuthContext);
  const getUser =
    user._id == id ? { ...user } : users.find((obj) => obj._id == id);
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
  } = getUser;

  const postCount = allPosts.filter((obj) => obj.username === username).length;
  const getPosts = allPosts.filter(
    ({ username }) => username === getUser.username
  );

  const getJoinDate = (dt) => {
    const date = new Date(dt);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };
  return (
    <>
      <div className="profile-container">
        <div className="heading-container">
          <sapn className="back-icon" onClick={navigateBack}>
            <i class="bi bi-arrow-left"></i>
          </sapn>
          <div className="profile-heading">
            <p className="profile-title">{firstName + " " + lastName}</p>
            <p className="post-count">{postCount} posts</p>
          </div>
          {getUser.username === user.username ? (
            <div class="dropdown-profile-container">
              <span
                class="dropdown-icon"
                type="span"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <UserCog size={32} strokeWidth={2.5} />
              </span>
              <ul class="dropdown-menu">
                <span className="dropdown-item" type="" data-bs-toggle="modal" data-bs-target="#exampleModal-profile">Edit</span>
                <span className="dropdown-item" onClick={()=>logOutHandler()}>Logout</span>
              </ul>
            </div>
          ) : (
            <div class="dropdown-profile-container">
              {isFollowing(id, user) ? (
                <button
                  className="btn-unfollow"
                  onCspanck={() => unfollow(id, setData, setUser)}
                >
                  Following
                </button>
              ) : (
                <button
                  className="btn-follow"
                  onClick={() => follow(id, setData, setUser)}
                >
                  Follow
                </button>
              )}
            </div>
          )}
        </div>
        <img
          className="header-img"
          src={
            header
              ? header
              : "https://media.istockphoto.com/id/1040250650/photo/white-studio-background.jpg?b=1&s=612x612&w=0&k=20&c=s8OzauvZiYTcWi57nFXVe7oYWJ7Ul0IMN0MNIySkc1M="
          }
        />
        <img
          className="avatar-img"
          src={
            avatar
              ? avatar
              : "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0="
          }
        />
        <div className="profile-data">
          <div className="profile-user-details">
            <p className="fullName profile-name">
              {firstName + " " + lastName}
            </p>
            <p className="userName">@{username}</p>
          </div>
          <p className="bio">{bio}</p>
          <p className="website">
            <i class="bi bi-link-45deg"></i>
            <a href={website}>{website}</a>
          </p>
          <div className="user-loc-date-data">
            <span className="location">
              <i class="bi bi-geo-alt"></i> {location}
            </span>
            <span className="joined-date">
              <i class="bi bi-calendar4"></i> Joined {getJoinDate(createdAt)}
            </span>
          </div>
          <div className="user-follow-data">
            <span>{followers.length} Followers</span>
            <span>{following.length} Following</span>
          </div>
        </div>
        <hr />
        <div>
          {getPosts.length > 0
            ?getPosts.map((obj) => (
            <Post post={obj} />
          ))
          :<p className="empty-page">Oops no posts to show here!</p>
          }
        </div>
        <div
          class="modal fade modal-lg"
          id="exampleModal-profile"
          tabindex="-1"
          data-bs-backdrop="static" data-bs-keyboard="false"
          aria-labelledby="exampleModalLabel-profile"
          aria-hidden="true"
        >
          <EditProfile/>
        </div>
      </div>
    </>
  );
}
