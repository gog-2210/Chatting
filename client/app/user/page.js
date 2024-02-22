import React from "react";
import Logout from "../../components/logout";
import Navigation from "@/components/navigation";
const UserPage = () => {
  return (
    <div className="flex">
      <Navigation />
      <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
        <h1 className="text-3xl text-gray-700">
          Chào mừng bạn đến với "ĐỘNG" là chém!
        </h1>
        <br />
        <p className="text-lg text-gray-600">GREEN HORNY Chatting</p>
      </div>
    </div>
  );
};
export default UserPage;
