import React from "react";
import { AiOutlineMessage, AiOutlineTeam } from "react-icons/ai";
import Image from "next/image";
import Logout from "./logout";

function Navigation() {
  return (
    <div className="flex flex-row">
      {/* Thanh navigation dọc */}
      <div className="hidden md:flex flex-col items-center h-screen border-r border-gray-300 bg-gray-200 px-3 pb-3 pt-2">
        {/* Avatar Profile */}
        <div className="my-3">
          <a href="user">
            <div className="w-12 h-12 rounded-full overflow-hidden hover:hover:opacity-50 duration-300">
              <Image
                layout="responsive"
                width={38}
                height={38}
                src="/profile.jpg"
                alt="profile"
              />
            </div>
          </a>
        </div>
        {/* Tabs */}
        <div className="mb-auto text-3xl mt-0">
          <div className="my-4 hover:text-gray-300  duration-300">
            <a href="conversations">
              <AiOutlineMessage />
            </a>
          </div>
          <div className="my-4 hover:text-gray-300  duration-300">
            <a href="conversations">
              <AiOutlineTeam />
            </a>
          </div>
        </div>
        {/* Logout */}
        <div className="my-1 text-3xl text-gray-400 hover:text-gray-700 duration-300">
          <Logout />
        </div>
      </div>

      {/* Thanh navigation ngang dưới cùng */}
      <div className="md:hidden flex justify-between bg-gray-200 p-4 fixed bottom-0 left-0 right-0 rounded-t-3xl border-t border-gray-300">
        <a href="conversations">
          <AiOutlineMessage className="text-3xl hover:text-gray-300  duration-300" />
        </a>
        <a href="#">
          <AiOutlineTeam className="text-3xl hover:text-gray-300  duration-300" />
        </a>
        <a href="user" className="hover:hover:opacity-50 duration-300">
          <Image
            className="box-border rounded-full h-7"
            src="/profile.jpg"
            width={28}
            height={28}
            alt="Picture of the author"
          />
        </a>
        <div className="text-2xl text-gray-400 hover:text-gray-700  duration-300">
          <Logout />
        </div>
      </div>
    </div>
  );
}

export default Navigation;
