"use client";
import React from "react";
import Logout from "../../components/logout";
import { useRouter } from "next/navigation";
import { AiOutlineMessage, AiOutlineCloud } from "react-icons/ai";
import Image from "next/image";

const ConversationsPage = () => {
  const router = useRouter();
  return (
    <div className="flex flex-row">
      {/* Nav */}
      <div className="flex flex-col items-center h-screen border-r border-gray-300 bg-gray-200 px-3 pb-3 pt-2">
        {/* Avatar Profile */}
        <div className="my-5">
          <a href="#">
            <Image
              className="box-border rounded-full h-10"
              src="/profile.jpg"
              width={40}
              height={40}
              alt="Picture of the author"
            />
          </a>
        </div>
        {/* Tabs */}
        <div className="mb-auto text-4xl">
          <a href="#">
            <AiOutlineMessage />
          </a>
          <a href="#">
            <AiOutlineCloud />
          </a>
          <a href="#">
            <AiOutlineCloud />
          </a>
          <a href="#">
            <AiOutlineCloud />
          </a>
          <a href="#">
            <AiOutlineCloud />
          </a>
        </div>
        {/* Logout */}
        <div className=" my-1 text-3xl">
          <Logout />
        </div>
      </div>
      {/* list */}
      <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
        <h1 className="text-3xl text-gray-700">Hi guys!</h1>
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
