import React from "react";
import { FaGoogle } from "react-icons/fa";

const OAuth = () => {
  return (
    <div>
      <button className="w-full  flex text-center justify-center  gap-4  border border-double  py-2 active:scale-90 ">
       
       <FaGoogle className="size-5"/>
        SignIn With Google
      </button>
    </div>
  );
};

export default OAuth;
