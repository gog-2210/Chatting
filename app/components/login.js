"use client";
import React, { useState, useEffect } from "react";
import "../styles/login.css";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkSession = async () => {
      try {
        await axios.get("/auth/session").then((response) => {
          if (response.data.loggedIn === true) {
            window.location.href = response.data.redirectURL;
          }
        });
      } catch (error) {}
    };
    checkSession();
  }, []);

  const loginUser = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    await axios
      .post("/auth/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.data.sign === false) {
          toast.error(response.data.message);
        }
        if (response.data.sign === true) {
          window.location.href = response.data.message;
        }
      })
      .catch((error) => {
        toast.error("Đã xảy ra lỗi khi đăng nhập", error);
      });
  };

  const registerUser = async (event) => {
    event.preventDefault();
    if (!name || !email || !password) {
      toast.error("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    try {
      const response = await axios.post("/auth/register", {
        name,
        email,
        password,
      });
      if (response.data.sign === true) {
        toast.success(
          response.data.message,
          handleSignInClick(),
          setName(""),
          setEmail(""),
          setPassword("")
        );
        return;
      }
      toast.error(response.data.message);
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi đăng ký");
    }
  };

  const [isRightPanelActive, setRightPanelActive] = useState(false);
  const handleSignUpClick = () => {
    setRightPanelActive(true);
  };
  const handleSignInClick = () => {
    setRightPanelActive(false);
  };

  return (
    <div
      className={`container ${isRightPanelActive ? "right-panel-active" : ""}`}
      id="container"
    >
      {/* đăng ký */}
      <div className="form-container sign-up-container">
        <form action="#" onSubmit={registerUser}>
          <h1>Create Account</h1>
          <div className="social-container">
            <a href="/auth/google" className="social">
              <FcGoogle className="text-3xl" />
            </a>
            <a href="" className="social">
              <FaFacebook className="text-3xl text-blue-600" />
            </a>
            <a href="" className="social">
              <FaGithub className="text-3xl" />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      {/* đăng nhập */}
      <div className="form-container sign-in-container">
        <form action="#" onSubmit={loginUser}>
          <h1>Sign in</h1>
          <div className="social-container">
            <a href="/auth/google" className="social">
              <FcGoogle className="text-3xl" />
            </a>
            <a href="" className="social">
              <FaFacebook className="text-3xl text-blue-600" />
            </a>
            <a href="" className="social">
              <FaGithub className="text-3xl" />
            </a>
          </div>
          <span>or use your account</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <a href="#">Forgot your password?</a>
          <button type="submit">Sign In</button>
        </form>
      </div>
      {/* chuyển panel */}
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>
              To keep connected with us please login with your personal info
            </p>
            <button className="ghost" onClick={handleSignInClick}>
              Sign In
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button className="ghost" onClick={handleSignUpClick}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
