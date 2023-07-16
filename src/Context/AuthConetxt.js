import { createContext, useEffect, useState } from "react";
import axios from "axios";


export const AuthContext= createContext();

export function AuthProvider({children}){
    const localStorageToken = JSON.parse(localStorage.getItem("login"));
  const [token, setToken] = useState(localStorageToken?.token);
  const localStorageUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(localStorageUser?.user);

    const loginUser=async (creds, address)=>{
    try {
      const {
        data: { foundUser, encodedToken },status
      } = await axios.post("/api/auth/login", {
        username: "johndoe",
    password: "123john",
      });
      if (status === 200) {
        localStorage.setItem("token", JSON.stringify({ token: encodedToken }));
        setToken(encodedToken);
        localStorage.setItem("user", JSON.stringify({ user: foundUser }));
        setUser(foundUser);
      }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <AuthContext.Provider value={{token,user}}>
                {children}
            </AuthContext.Provider>
        </>
    )
}