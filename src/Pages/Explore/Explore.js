import { useContext, useEffect } from "react";
import { Post } from "../../Components/Post/Post";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import { sortPosts } from "../../utils/sortPosts";

export function Explore() {
  const {
    data: { allPosts, filter },
    setData,
    isLoad,
    isError,
  } = useContext(DataContext);
  const { user, token } = useContext(AuthContext);

  const filteredPosts = sortPosts(allPosts, filter);

  useEffect(() => {
    setData({ type: "SET_FILTER", payload: "" });
  }, []);

  return (
    <>
      <div className="home-page">
        <h1 className="home-title">Explore</h1>
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
        <div>
          {isLoad ? (
            <div class="loader"></div>
          ) : (
            filteredPosts.map((obj) => <Post post={obj} />)
          )}
        </div>
      </div>
    </>
  );
}
