import React, { useState } from "react";
import { Link } from "react-router-dom";
const CaptainSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();
    setUserData({
      fullName: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    });
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
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
          <h3 className="text-lg font-medium mb-2">What's Your Name Captain!</h3>
          <div className="flex gap-4">
            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base  mb-7 "
              type="email"
              placeholder="Harry"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base  mb-7 "
              type="text"
              placeholder="Kane"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base  mb-7 "
            type="email"
            placeholder="abc@gmail.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            className="bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base  mb-7"
            type="password"
            placeholder="********"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="bg-[#111] rounded px-4 py-2 text-white font-semibold w-full ">
            Create Account
          </button>
        </form>
        <p className="my-2">
          Already have an Account?
          <Link
            to="/captain-login"
            className="text-base  text-gray-500  hover:text-gray-800"
          >
            &nbsp;Login Here
          </Link>
        </p>
      </div>

      <Link
        to="/signup"
        className="bg-[#f08c4a] flex items-center justify-center rounded px-4 py-2 text-white font-semibold w-full "
      >
        SignUp As User
      </Link>
    </div>
  );
};

export default CaptainSignUp;
