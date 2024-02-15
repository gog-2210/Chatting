"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function Verifyemail() {
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const email = searchParams.get("email");
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(
          `/auth/verify?email=${email}&code=${code}`
        );
        //ở đây trả về undefined
      } catch (error) {
        console.log(error);
      }
    };

    verifyUser();
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-200">
      <h1 className="text-4xl text-gray-700">
        <b>Chào mừng bạn đến với "ĐỘNG" là chém!</b>
      </h1>
      <p className="text-lg text-gray-600 m-2">
        <i>
          "Bạn đã được xác nhận là thành viên cốt cản của
          <a href="/login" className="text-lg text-orange-600">
            {" "}
            Green Horny{" "}
          </a>{" "}
          !"
        </i>
      </p>
    </div>
  );
}
