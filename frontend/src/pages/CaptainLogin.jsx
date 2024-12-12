import React, { useState } from "react";
import { Link } from "react-router-dom";
const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault;
    
    setUserData({
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
  };

  return (
    <div className="p-7 flex flex-col justify-between h-screen">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={(e) => submitHandler(e)}>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base  mb-7 "
            type="email"
            placeholder="abc@gmail.com"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base  mb-7"
            type="password"
            placeholder="********"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button className="bg-[#111] rounded px-4 py-2 text-white font-semibold w-full ">
            Login
          </button>
        </form>
        <p className="my-2">
          Want to join?
          <Link
            to="/captain-signup"
            className="text-base  text-gray-500  hover:text-gray-800"
          >
            &nbsp;Create Account
          </Link>
        </p>
      </div>

      <Link
        to="/login"
        className="bg-[#F08C4A] flex items-center justify-center rounded px-4 py-2 text-white font-semibold w-full "
      >
        SignIn As User
      </Link>
    </div>
  );
};

export default CaptainLogin;
