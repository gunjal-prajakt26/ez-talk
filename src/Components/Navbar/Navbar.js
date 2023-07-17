import "./Navbar.css";

export function Navbar(){
    return (
        <>
    <div class=" navbar-container">
  <p className="tabs"><span><i class="bi bi-house-door"> </i>Home</span></p>
  <p className="tabs"><span><i class="bi bi-rocket-takeoff"> </i>Explorer</span></p>
  <p className="tabs"><span><i class="bi bi-bookmark"> </i>Bookmarks</span></p>
  <p className="tabs"><span><i class="bi bi-person-square"> </i>Profile</span></p>
  <p className="post-btn"><span><i class="bi bi-plus-square"> </i>New Post</span></p>
</div>
        </>
    )
}