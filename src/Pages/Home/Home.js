import { XCircle } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Avtar } from "../../Components/Avtar/Avtar";
import { Post } from "../../Components/Post/Post";
import { AuthContext } from "../../Context/AuthConetxt";
import { DataContext } from "../../Context/DataContext";
import { createPost } from "../../utils/editDeletePost";
import { sortPosts } from "../../utils/sortPosts";
import "./Home.css";

export function Home() {
  const postData={
    content: "",
    mediaURL: "",
  };

  const [inputData, setInputData] = useState(postData);
  const {
    data: { allPosts, filter },
    setData,
    isLoad,
    isError,
    setIsLoad
  } = useContext(DataContext);
  const { user, token } = useContext(AuthContext);

  const getPosts = allPosts.filter(
    ({ username }) => username === user.username
  );

  const filteredPosts = sortPosts(getPosts, filter);

  const imageUploadHandler = (e) => {
    const imageUrl = URL.createObjectURL(e.target.files[0]);
    setInputData((postdata) => ({ ...postdata, mediaURL: imageUrl }));
  };

  const postClickHandler=()=>{
    createPost(token, inputData, user, setData);
    setInputData((inputData)=>({...inputData, content:"",mediaURL:""}))
  }

  useEffect(() => {
    setData({ type: "SET_FILTER", payload: "" });

      setIsLoad(true);
      (async () => {
        try {
          const dataResponse = await fetch("/api/posts");
          const list = await dataResponse.json();
          setData({ type: "SET_POSTS", payload: list.posts });
          setIsLoad(false);
        } catch (error) {
          setIsLoad(false);
          console.error(error);
        }
      })();
  
      (async () => {
        try {
          const dataResponse = await fetch("/api/users");
          const list = await dataResponse.json();
          setData({ type: "SET_USERS", payload: list.users });
        } catch (error) {
          console.error(error);
        }
      })();
  
      
    }, []);
  return (<>
    {isLoad ? (
      <div class="loader"></div>
        ) : (
      <div className="home-page">
      <h1 className="home-title">Home</h1>
      <div className="filter-container">
        <p
          style={{
            fontWeight: filter === "Trending" ? "bold" : "",
          }}
          onClick={() => setData({ type: "SET_FILTER", payload: "Trending" })}
        >
          Trending
        </p>
        <p
          style={{
            fontWeight: filter === "Latest" ? "bold" : "",
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
            value={inputData.content}
            onChange={(e) =>
              setInputData((inputData) => ({
                ...inputData,
                content: e.target.value,
              }))
            }
          ></textarea>
          <div>
            {inputData.mediaURL.length !== 0 && 
          <div className="img-preview-home">
            <img src={inputData.mediaURL} className="post-img-home"/>
            <span className="close-icon" onClick={()=>setInputData((inputData)=>({...inputData,mediaURL:""}))}><XCircle size={36} /></span>
          </div>
            }
            </div>
          <div className="post-operations media-input-container">
            <label htmlFor="media-input-mdl-3">
            <i class="bi bi-card-image"></i>
            </label>
            <input
              key={inputData.mediaURL}
              type="file"
              id="media-input-mdl-3"
              name="media-input-mdl-3"
              className="choose-file"
              onChange={imageUploadHandler}
            />
            <button
              className={inputData.content?.trim().length === 0 && inputData.mediaURL.length === 0?"disabled":"btn-post"}
              disabled={inputData.content?.trim().length === 0 && inputData.mediaURL.length === 0&&true}
              onClick={() => postClickHandler()}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div>
          {filteredPosts.length > 0
            ?filteredPosts.map((obj) => <Post post={obj} />)
          :<p className="empty-page">Oops no posts to show here!</p>
            }
      </div>
    </div>
    )}
    </>
  );
}
