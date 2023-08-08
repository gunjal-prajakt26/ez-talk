import { toast } from "react-toastify";

export const addToBookmark = async (id, setData) => {
  try {
    const response = await fetch(`/api/users/bookmark/${id}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const jsonResponse = await response.json();
    if (response.status === 200) {
      setData({ type: "SET_BOOKMARKS", payload: jsonResponse.bookmarks });
      toast.success("Added to BookMark");
    }
  } catch (error) {
    console.error(error);
  }
};

export const removeFromBookmark = async (_id, setData) => {
  try {
    const response = await fetch(`/api/users/remove-bookmark/${_id}`, {
      method: "POST",
      headers: {
        authorization: localStorage.getItem("token"),
      },
    });
    const jsonResponse = await response.json();
    if (response.status === 200) {
      setData({ type: "SET_BOOKMARKS", payload: jsonResponse.bookmarks });
      toast.success("Removed From Bookmark");
    }
  } catch (error) {
    console.error(error);
  }
};

export const isPostBookmarked = (id, bookmarks) => {
  return bookmarks.find((_id) => _id === id) ? true : false;
};
