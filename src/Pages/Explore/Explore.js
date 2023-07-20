import { useContext } from "react";
import { Post } from "../../Components/Post/Post";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";

export function Explore() {
    const {
        data: { allPosts },
        setData,
        isLoad,
        isError,
      } = useContext(DataContext);
      const { user, token } = useContext(AuthContext);
    
  return (
    <>
      <div className="home-page">
        <h1 className="home-title">Explore</h1>
        <div className="filter-container">
          <p>Trending</p>
          <p>Latest Posts</p>
        </div>
        <div>
          {isLoad ? (
            <div class="loader"></div>
          ) : (
            allPosts.map((obj) => <Post post={obj} />)
          )}
        </div>
      </div>
    </>
  );
}
