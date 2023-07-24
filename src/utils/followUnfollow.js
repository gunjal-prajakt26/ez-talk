import { toast } from "react-toastify";

export const follow = async (id, setData, setUser) => {
    try {
      const response = await fetch(`/api/users/follow/${id}`, {
        method: 'POST',
        headers: {authorization: localStorage.getItem("token"), },
    })
    const jsonResponse = await response.json();
    if(response.status === 200) {
        // localStorage.setItem("user", JSON.stringify({ user: jsonResponse.user }));
        setUser(jsonResponse.user);
          setData({type:"UPDATE_USERLIST", payload: jsonResponse.followUser});
      toast.success("Followed");

      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  export const unfollow = async (id, setData, setUser) => {
      try {
          const response = await await fetch(
            `/api/users/unfollow/${id}`,
            {
              method: "POST",
              headers: { authorization: localStorage.getItem("token") },
            }
          );
            const jsonResponse = await response.json();
          if(response.status === 200) {
              setUser(jsonResponse.user);
              setData({type:"UPDATE_USERLIST", payload: jsonResponse.followUser});
              toast.warn("UnFollowed");
          }
      }
      catch (error) {
        console.log(error);
      }
  }
  
  export const isFollowing = (userId, user) => {
      return user.following.find((obj) => obj._id === userId) ? true : false;
  }