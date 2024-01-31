"use client";
import React from "react";
import axios from "axios";

export default function Logout() {
  const logout = async () => {
    await axios.post("/auth/logout").then((res) => {
      window.location.href = res.data;
    });
  };
  return <button onClick={logout}>Logout</button>;
}
