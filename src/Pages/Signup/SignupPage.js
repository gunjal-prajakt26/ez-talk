import { Instagram } from "lucide-react";
import { NavLink } from "react-router-dom";

export function SignupPage() {
  return (
    <div className="login-container">
      <p class="header-title login-header"><Instagram color="#0277bd" size={36} strokeWidth={2.25} />{" "}i-Gram</p>
      <div class="container login-form-1">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Your firstname*"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Your lastname*"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            placeholder="Your username*"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Your Password *"
            required
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Confirm Password *"
            required
          />
        </div>
        <div class="form-group">
        <button className="btnSubmit">Signup</button>
        </div>
        <div class="form-group">
        <p className="login-text">Already have an account? <NavLink to="/login" className="login-link">Login</NavLink> </p>
        </div>
      </div>
    </div>
  );
}

