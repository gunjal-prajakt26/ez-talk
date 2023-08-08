import axios from "axios";
import { toast } from "react-toastify";

export const createPost = async (token, post, user, setData) => {
    try {
      const response = await axios.post(
        "/api/posts",
        {
          postData: {
            content: post.content,
            mediaURL: post.mediaURL,
            name: `${user.firstName} ${user.lastName}`,
          },
        },
        { headers: { authorization: token } }
      );
      if (response.status === 201) {
        setData({ type: "SET_POSTS", payload: response.data.posts });
      toast.success("Post Created");

      }
    } catch (error) {
      console.error(error);
    }
  };
  
  export const editPost = async (token, postdata, setData) => {
    try {
      const response = await axios.post(
        `/api/posts/edit/${postdata._id}`,
        { postData: postdata },
        {
          headers: { authorization: token },
        }
      );
      if (response.status === 201) {
        setData({ type: "SET_POSTS", payload: response.data.posts });
      toast.success("Post Edited");
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deletePost = async (postId, setData,token) => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`, {
        headers: { authorization: token },
      });
      if (response.status === 201) {
        setData({ type: "SET_POSTS", payload: response.data.posts });
      toast.success("Post Deleted");
      }
    } catch (error) {
      console.error(error);
    }
  };
  