import { NavLink } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {

    const activeStyle={
        fontWeight:"700",
        borderLeft:"2px solid var(--primary-color)"
    }
  return (
    <>
      <div class=" navbar-container">
        <NavLink to="/" className="link tabs" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <i class="bi bi-house-door"> </i>Home
        </NavLink>
        <NavLink className="tabs link" to="/explore" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <i class="bi bi-rocket-takeoff"> </i>Explorer
        </NavLink>
        <NavLink className="tabs link" to="/bookmark" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <i class="bi bi-bookmark"> </i>Bookmarks
        </NavLink>
        <NavLink className="tabs link" to="/profile" style={({ isActive }) => (isActive ? activeStyle : undefined)}>
              <i class="bi bi-person-square"> </i>Profile
        </NavLink>
        <p className="post-btn">
          <span data-bs-toggle="modal" data-bs-target="#exampleModal" type="span">
            <i class="bi bi-plus-square"> </i>New Post
          </span>
        </p>
      </div>
      {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button> */}

<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Post</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </>
  );
}
