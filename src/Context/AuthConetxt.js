import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { json } from "react-router-dom";
import { formatDate } from "../backend/utils/authUtils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const localStorageToken = JSON.parse(localStorage.getItem("login"));
  const [token, setToken] = useState("");
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const loginUser = async (creds) => {
    try {
      const {
        data: { foundUser, encodedToken },
        status,
      } = await axios.post("/api/auth/login", {
        username: creds.username,
        password: creds.password,
      });
      if (status === 200) {
        localStorage.setItem("token", JSON.stringify({ token: encodedToken }));
        setToken(encodedToken);
        localStorage.setItem("user", JSON.stringify({ user: foundUser }));
        setUser(foundUser);
        setIsLogin(true);
        navigate("/");
        toast.success("LogIn Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("LogIn Failed");
    }
  };

  const signupAuthUser = async (signupData) => {
    try {
      const {
        data: { createdUser, encodedToken },
        status,
      } = await axios.post("/api/auth/signup", { ...signupData });
      if (status === 201) {
        localStorage.setItem("token", JSON.stringify({ token: encodedToken }));
        setToken(encodedToken);
        localStorage.setItem("user", JSON.stringify({ user: createdUser }));
        setUser(createdUser);
        setIsLogin(true);
        navigate("/");
        toast.success("SignUp Successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("SignUp Failed");
    }
  };
  const logOutHandler=()=>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setToken("");
    setUser({})
    setIsLogin(false)
    toast.success("You're logged out!");
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

  // useEffect(()=>{

  //   // signupAuthUser(abc);
  //   loginUser({username: "pareshaaaaan",
  //   password: "123",});
  // },[])
  return (
    <>
      <AuthContext.Provider
        value={{ token, user, setUser, loginUser, signupAuthUser,isLogin ,logOutHandler}}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
