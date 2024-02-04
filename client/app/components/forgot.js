"use client";
import React, { useState } from "react";

const forgot = () => {
  const { a, setA } = useState("");
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <div className="bg-white rounded-xl shadow-md p-10">
        <h1 className="flex flex-col justify-center items-center text-xl text-gray-700 mb-4">
          <b>Nhập email của bạn</b>
        </h1>
        <input
          type="text"
          placeholder="Nhập email đây mày..."
          className="bg-gray-200 border-none rounded p-2 m-2"
        />
        <button className="bg-red-500 border-red-500 text-white font-bold uppercase rounded-md border-2 px-4 py-2 text-sm transition duration-300 ease-in-out hover:bg-transparent hover:text-red-500 hover:border-red-500">
          Gửi
        </button>
      </div>
    </div>
  );
};

export default forgot;
