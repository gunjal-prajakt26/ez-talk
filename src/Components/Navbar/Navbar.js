import { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import { Avtar } from "../Avtar/Avtar";
import { NewPostModal } from "../PostModal/NewPostModal";
import "./Navbar.css";

export function Navbar() {
  const { setData } = useContext(DataContext);
  const { user, token } = useContext(AuthContext);
  const location = useLocation();

  const activeStyle = {
    fontWeight: "700",
    borderLeft: "2px solid var(--primary-color)",
  };
  const postInfo={
    content: "",
    mediaURL: "",
  };
  
  return (
    <>
      <div class=" navbar-container">
        <NavLink
          to="/"
          className="link tabs"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <i class="bi bi-house-door"> </i>Home
        </NavLink>
        <NavLink
          className="tabs link"
          to="/explore"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <i class="bi bi-rocket-takeoff"> </i>Explorer
        </NavLink>
        <NavLink
          className="tabs link"
          to="/bookmarks"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          <i class="bi bi-bookmark"> </i>Bookmarks
        </NavLink>
        <NavLink
          className="tabs link"
          to={`/profile/${user._id}`}
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          state={{ from: location }}
        >
          <i class="bi bi-person-square"> </i>Profile
        </NavLink>
        <p className="post-btn">
          <span
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            type="span"
          >
            <i class="bi bi-plus-square"> </i>New Post
          </span>
        </p>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <NewPostModal
        postInfo={postInfo}
          user={user}
          token={token}
          setData={setData}
        />
      </div>
    </>
  );
}
