import { useContext } from "react";
import { Avtar } from "../../Components/Avtar/Avtar";
import { Post } from "../../Components/Post/Post";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import "./Home.css";

export function Home() {
  const {
    data: { allPosts },
    setData,
    isLoad,
    isError,
  } = useContext(DataContext);
  const { user, token } = useContext(AuthContext);

  const getPosts = allPosts.filter(
    ({ username }) => username === user.username
  );
  return (
    <div className="home-page">
      <h1 className="home-title">Home</h1>
      <div className="filter-container">
        <p>Trending</p>
        <p>Latest Posts</p>
      </div>
      <div className="post-container">
      <Avtar postUsername={user.username}/>
        <div class="post-content">
          <textarea
            class="form-control input-text"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Write new post..."
          ></textarea>
        </div>
    </div>
      <div>
        {isLoad ? (
          <div class="loader"></div>
        ) : (
          getPosts.map((obj) => <Post post={obj} />)
        )}
      </div>
    </div>
  );
}
