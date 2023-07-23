import { Instagram } from "lucide-react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthConetxt";
import "./LoginPage.css";

export function LoginPage() {
const [inputData, setInputData]=useState({username:"",password:""})
  const { user, token, loginUser} = useContext(AuthContext);

  const loginHandler=()=>{
    loginUser(inputData)
  }

  const guestLoginHandler=()=>{
    loginUser({username: "kevindebruyne",
    password: "kevindebruyne123"})
  }
  return (
    <div className="login-container">
      <p class="header-title login-header"> <Instagram size={36} color="#0277bd" strokeWidth={2.25} />{" "}i-Gram</p>
      <div class="login-form-1">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            value={inputData.username}
            placeholder="Your username*"
            onChange={(e)=>setInputData((inputData)=>({...inputData, username:e.target.value}))}
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            value={inputData.password}
            placeholder="Your Password *"
            onChange={(e)=>setInputData((inputData)=>({...inputData, password:e.target.value}))}
          />
        </div>
        <div class="form-group">
        <button className="btnSubmit" onClick={()=>loginHandler()}>Login</button>
        </div>
        <div class="form-group">
        <button className="btnSubmit" onClick={()=>guestLoginHandler()}>Login As Guest</button>
        </div>
        <div class="form-group">
        <p className="signup-text">Don't have an account? <NavLink to="/signup" className="signup-link">Sign Up</NavLink></p>
        </div>
      </div>
    </div>
  );
}
