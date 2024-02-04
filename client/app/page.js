"use client";
import React, { useEffect } from "react";
import axios from "axios";

export default function Home() {
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
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <h1 className="text-3xl text-gray-700">
        Chào mừng bạn đến với "ĐỘNG" là chém!
      </h1>
      <br />
      <p className="text-lg text-gray-600">
        Đăng nhập để chém gió với mọi người nhé!
      </p>
      <button className="text-lg text-orange-600">
        <a href="/login"> {`=>`} Đăng nhập!!!</a>
      </button>
    </div>
  );
}
