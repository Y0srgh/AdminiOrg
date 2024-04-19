import React from "react";
import "./LoginFrom.css";
import { FaUser, FaLock } from "react-icons/fa";
import {Link} from 'react-router-dom'


const LoginFrom = () => {
  return (
    <div className="wrapper">
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
            <input type="text" required placeholder="Username"/>
            <FaUser className="icon" />
        </div>
        <div className="input-box">
            <input type="password" required placeholder="Password"/>
            <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
            <label><input type="checkbox" />Remeber me</label>
            <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
            <p>Don't have an account? <Link to="/signup">Register</Link></p>
        </div>
      </form>
    </div>
  );
};

export default LoginFrom;
