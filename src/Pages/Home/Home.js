import { useContext, useEffect } from "react";
import { Avtar } from "../../Components/Avtar/Avtar";
import { Post } from "../../Components/Post/Post";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import { sortPosts } from "../../utils/sortPosts";
import "./Home.css";

export function Home() {
  const {
    data: { allPosts, filter },
    setData,
    isLoad,
    isError,
  } = useContext(DataContext);
  const { user, token } = useContext(AuthContext);

  const getPosts = allPosts.filter(
    ({ username }) => username === user.username
  );

  const filteredPosts = sortPosts(getPosts, filter);

  useEffect(() => {
    setData({ type: "SET_FILTER", payload: "" })
}, [])
  return (
    <div className="home-page">
      <h1 className="home-title">Home</h1>
      <div className="filter-container">
        <p
          style={{
            color: filter === "Trending" ? "var(--primary-color)" : "black",
          }}
          onClick={() => setData({ type: "SET_FILTER", payload: "Trending" })}
        >
          Trending
        </p>
        <p
          style={{
            color: filter === "Latest" ? "var(--primary-color)" : "black",
          }}
          onClick={() => setData({ type: "SET_FILTER", payload: "Latest" })}
        >
          Latest Posts
        </p>
      </div>
      <div className="post-container">
        <Avtar postUsername={user.username} />
        <div class="post-content">
          <textarea
            class="form-control input-text"
            rows="1"
            placeholder="Write new post..."
          ></textarea>
          <div className="post-operations">
            <span className="post-icons">
              <i class="bi bi-card-image"></i>
            </span>
            <button className="btn-post">Post</button>
          </div>
        </div>
      </div>
      <div>
        {isLoad ? (
          <div class="loader"></div>
        ) : (
          filteredPosts.map((obj) => <Post post={obj} />)
        )}
      </div>
    </div>
  );
}
