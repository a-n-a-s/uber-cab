import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="bg-[url(https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9222d8182519763.652f3604b94bb.png)] bg-cover bg-center pt-8  h-screen w-full flex justify-between  items-end ">
        <img
          className="w-16 absolute left-5 top-5"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <div className="bg-white w-full py-4 px-4 pb-7">
          <h2 className="text-3xl font-bold ">Get Started With Uber</h2>
          <Link to='/login' className="flex items-center justify-center mt-5 bg-black text-white w-full py-3 rounded">
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
