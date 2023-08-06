import { Instagram } from "lucide-react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../Context/AuthConetxt";

export function SignupPage() {
  const data={
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  }
  const [userSignupData, setUserSignupData] = useState(data);
  const [error, setError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const { signupAuthUser } = useContext(AuthContext);

  const signupHandler = (e) => {
    e.preventDefault();
    if (
      userSignupData?.firstName.length  &&
      userSignupData?.lastName.length &&
      userSignupData?.username.length &&
      userSignupData?.password.length &&
      confirmPassword.length
    ) {
      if (userSignupData.password === confirmPassword) {
        signupAuthUser(userSignupData);
      } else {
        setError(true);
      }
    }
    // signupAuthUser(userSignupData);
  };
  return (
    <div className="login-container">
      <p class="header-title login-header">
        <Instagram color="#0277bd" size={36} strokeWidth={2.25} /> i-Gram
      </p>
      <h3 className="login-title">SignUp</h3>
      <div class="container login-form-1">
        {error ? <h4 className="error-msg">Password dose not match</h4> : ""}
        <form onSubmit={(e)=>signupHandler(e)}>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Your firstname*"
              value={userSignupData.firstName}
              onChange={(e) =>
                setUserSignupData((userSignupData) => ({
                  ...userSignupData,
                  firstName: e.target.value,
                }))
              }
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Your lastname*"
              value={userSignupData.lastName}
              onChange={(e) =>
                setUserSignupData((userSignupData) => ({
                  ...userSignupData,
                  lastName: e.target.value,
                }))
              }
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Your username*"
              value={userSignupData.username}
              onChange={(e) =>
                setUserSignupData((userSignupData) => ({
                  ...userSignupData,
                  username: e.target.value,
                }))
              }
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Your Password *"
              value={userSignupData.password}
              onChange={(e) =>
                setUserSignupData((userSignupData) => ({
                  ...userSignupData,
                  password: e.target.value,
                }))
              }
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              class="form-control"
              placeholder="Confirm Password *"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(() => e.target.value)}
              required
            />
          </div>
          <div class="form-group">
            <button type="submit" className="btnSubmit">
              Signup
            </button>
          </div>
          <div class="form-group">
            <p className="login-text">
              Already have an account?{" "}
              <NavLink to="/login" className="login-link">
                Login
              </NavLink>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
