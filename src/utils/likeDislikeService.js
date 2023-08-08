import axios from "axios";

export const likePost = async (id, setData) => {
  try {
    const response = await axios.post(
      `/api/posts/like/${id}`,
      {},
      {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      }
    );
    // const jsonResponse = await response.json();
    if (response.status === 201) {
      setData({ type: "SET_POSTS", payload: response.data.posts });
    }
  } catch (error) {
    console.error(error);
  }
};

export const dislikePost = async (id, setData) => {
  try {
    const response = await fetch(`/api/posts/dislike/${id}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const jsonResponse = await response.json();
    if (response.status === 201) {
      setData({ type: "SET_POSTS", payload: jsonResponse.posts });
    }
  } catch (error) {
    console.error(error);
  }
};

export const isPostLiked = (post, user) => {
  return post?.likes?.likedBy.find(({ _id }) => _id === user._id)
    ? true
    : false;
};
