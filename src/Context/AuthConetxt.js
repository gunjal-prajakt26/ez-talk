import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { formatDate } from "../backend/utils/authUtils";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const localStorageToken = JSON.parse(localStorage.getItem("login"));
  const [token, setToken] = useState(localStorageToken?.token);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localStorageUser?.user);

  const loginUser = async () => {
    try {
      const {data:{foundUser, encodedToken}, status} = await axios.post("/api/auth/login",{
        username: "kevindebruyne",
    password: "kevindebruyne123",
      })
      if (status === 200) {
      localStorage.setItem("token", JSON.stringify({ token: encodedToken }));
      setToken(encodedToken);
      localStorage.setItem("user", JSON.stringify({ user: foundUser }));
      setUser(foundUser);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const signupAuthUser = async (signupData) => {
    try {
      const {data:{createdUser, encodedToken}, status} = await axios.post("/api/auth/signup", {...signupData})
        if(status === 201) {
          localStorage.setItem("token", JSON.stringify({ token: encodedToken }));
          setToken(encodedToken);
          localStorage.setItem("user", JSON.stringify({ user: createdUser }));
          setUser(createdUser);
        }
    }
    catch(error) {
        console.error(error)
    }
}

  const abc = {
    _id: "01",
    fullName: "Prashant Singh Chauhan",
    username: "pareshaaaaan",
    password: "123",
    bio: "Hey there, Prashant here",
    website: "https://github.com/percius47",
    profileAvatar: "https://picsum.photos/id/1012/150",
    createdAt: formatDate(),
    updatedAt: formatDate(),
    following: [
      {
        _id: "5",
        fullName: "John Doe",
        username: "johndoe",
        profileAvatar: "https://picsum.photos/id/1009/150",
      },
    ],
    followers: [
      {
        _id: "2",
        fullName: "John Doe",
        username: "johndoe",
        profileAvatar: "https://picsum.photos/id/1009/150",
      },
      {
        _id: "3",
        fullName: "Aditya Jadhav",
        username: "aditya_jadhav",
        profileAvatar: "https://picsum.photos/id/100/150",
      },
      {
        _id: "4",
        fullName: "Anshaal Khanna",
        username: "anshaal10",
        profileAvatar: "https://picsum.photos/id/1005/150",
      },
    ],
  };

  useEffect(()=>{

    // signupAuthUser(abc);
    loginUser();
  },[])

  return (
    <>
      <AuthContext.Provider value={{ token, user,setUser }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
