import axios from "axios";

export const createPost = async (token, post, user, setData) => {
    try {
      const response = await axios.post(
        "/api/posts",
        {
          postData: {
            content: post.content,
            mediaURL: post.postImage,
            name: `${user.firstName} ${user.lastName}`,
          },
        },
        { headers: { authorization: token } }
      );
      // console.log({ response });
      if (response.status === 201) {
        setData({ type: "SET_POSTS", payload: response.data.posts });
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
      // console.log(response);
      if (response.status === 201) {
        setData({ type: "SET_POSTS", payload: response.data.posts });
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  export const deletePost = async (token, postId, setData) => {
    try {
      const response = await axios.delete(`/api/posts/${postId}`, {
        headers: { authorization: token },
      });
      // console.log({response});
      if (response.status === 201) {
        setData({ type: "SET_POSTS", payload: response.data.posts });
      }
    } catch (error) {
      console.error(error);
    }
  };
  