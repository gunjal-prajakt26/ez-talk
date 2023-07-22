import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { dispatch } from "../Reducer/DataReducer";
import { AuthContext } from "./AuthConetxt";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const initialValue = { allPosts: [], users: [], bookmarks: [],filter:'' };
  const [isLoad, setIsLoad] = useState(false);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useReducer(dispatch, initialValue);
  const { user, token } = useContext(AuthContext);


  const addToBookmark = async (id, token) => {
    console.log(token);
    try {
        const response = await axios.post(`/api/users/bookmark/${id}`, {}, {headers: {authorization: token}})
        if(response.status === 200) {
            setData({type: "SET_BOOKMARKS", payload: response.data.bookmarks})
        }
    }
    catch (error) {
        console.error(error)
    }

}

const removeFromBookmark = async (_id) => {

    try {
        const response = await axios.post(`/api/users/remove-bookmark/${_id}`, {}, {headers: {authorization: token}})
        console.log(response);
        if(response.status === 200) {
            // setData({type: "SET_BOOKMARKS", payload: response.data.bookmarks})
        }
    }
    catch (error) {
        console.error(error)
    }

}

const likePost = async (token, id) => {
  try {
      const response = await axios.post(`/api/posts/like/${id}`, {}, {headers: {authorization: token}})
      // console.log(response);
      if(response.status === 201) {
          setData({type: "SET_POSTS", payload: response.data.posts});
      }
  }
  catch (error) {
      console.error(error)
  }
}

const dislikePost = async (token, id) => {
  try {
      const response = await axios.post(`/api/posts/dislike/${id}`, {}, {headers: {authorization: token}})
      // console.log(response);
      if(response.status === 201) {
          setData({type: "SET_POSTS", payload: response.data.posts});
      }
  }
  catch (error) {
      console.error(error)
  }
}

  useEffect(() => {
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

  // console.log(data.allPosts);
  return (
    <>
      <DataContext.Provider value={{ data, setData, isLoad, isError, addToBookmark, removeFromBookmark,likePost,dislikePost }}>
        {children}
      </DataContext.Provider>
    </>
  );
}
