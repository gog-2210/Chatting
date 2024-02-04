"use client";
import React from "react";
import Logout from "../components/logout";
import { useRouter } from "next/navigation";

const ConversationsPage = () => {
  const router = useRouter();
  return (
    <div>
      <Logout />
      <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
        <h1 className="text-3xl text-gray-700">
          Chào mừng bạn đến với "ĐỘNG" là chém!
        </h1>
        <br />
        <p className="text-lg text-gray-600">GREEN HORNY Chatting</p>
        <button type="button" onClick={() => router.push("/user")}>
          User Page
        </button>
      </div>
    </div>
  );
};

export default ConversationsPage;
