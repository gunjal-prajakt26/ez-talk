import { Link } from "react-router-dom";
import "./Navbar.css";

export function Navbar(){
    return (
        <>
    <div class=" navbar-container">
    <Link to="/" className="link"><p className="tabs"><span><i class="bi bi-house-door"> </i>Home</span></p></Link>
  <Link className="link" to="/explore"><p className="tabs"><span><i class="bi bi-rocket-takeoff"> </i>Explorer</span></p></Link>
  <Link className="link" to="/bookmark"><p className="tabs"><span><i class="bi bi-bookmark"> </i>Bookmarks</span></p></Link>
  <Link className="link" to="/profile"><p className="tabs"><span><i class="bi bi-person-square"> </i>Profile</span></p></Link>
  <p className="post-btn"><span><i class="bi bi-plus-square"> </i>New Post</span></p>
</div>
        </>
    )
}