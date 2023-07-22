import axios from "axios";

export const follow = async (id, token, setData, setUser) => {
    try {
      const response = await axios.post(
        `/api/users/follow/${id}`,
        {},
         { authorization: token }
      );
      console.log(response);
      if(response.status === 200) {
          setUser(response.data.user);
          setData({type: "SET_USERS", payload: response.data.followUser});
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  export const unfollow = async (id, token, setData, setUser) => {
      try {
          const response = await axios.post(
              `/api/users/unfollow/${id}`,
              {},
              { headers: { authorization: token } }
            );
            console.log(response);
          if(response.status === 200) {
              setUser(response.data.user);
              setData({type: "SET_USERS", payload: response.data.followUser});
          }
      }
      catch (error) {
        console.log(error);
      }
  }
  
  export const isFollowing = (userId, user) => {
      return user.following.find((obj) => obj._id === userId) ? true : false;
  }