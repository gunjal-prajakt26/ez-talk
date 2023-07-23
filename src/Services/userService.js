import axios from "axios";

export const followService= async(id,token)=>await axios.post(
    `/api/users/follow/${id}`,
    {},
     { authorization: token }
  )