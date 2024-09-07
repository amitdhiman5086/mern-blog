import React from "react";
import { CiFacebook } from "react-icons/ci";
import {
  FaDiscord,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full -mt-4 rounded-lg bg-blue-900 ">
      <div className="w-full pt-5 ">
        <div className=" w-full flex flex-col  rounded-lg gap-3  px-10 py-3   ">
          {/* left */}
          <div className="">
            <Link
              to={"/"}
              className="self-center whitespace-nowrap text-sm md:text-xl font-semibold dark:text-white"
            >
              <span className="px-2 py-1 bg-gradient-to-r from-violet-400 to-pink-300 rounded-lg text-white ">
                Zoo's
              </span>
              Blog
            </Link>
          </div>
          {/* right */}
          <div className="flex gap-3 md:gap-0 flex-wrap">
            <div className=" flex-auto w-32">
              {/* 1 */}

              <Link className="text-gray-400  font-semibold text-2xl">
                About Us
              </Link>
              <ul className="font-light">
                <li>Resume</li>
                <li>Live Link</li>
              </ul>
            </div>
            <div className="flex-auto w-32">
              {/* 2 */}
              <h4 className="text-gray-400  font-semibold text-2xl">
                Follow Us
              </h4>
              <ul className="font-light ">
                <li>Git Hub</li>
                <li>Discord</li>
              </ul>
            </div>
            <div className="flex-auto w-32">
              {/* 3 */}

              <h4 className="text-gray-400  font-semibold text-2xl">Legal</h4>
              <ul className="font-light">
                <li>Privcay Policy</li>
                <li>Terms & Condition</li>
              </ul>
            </div>
          </div>
          {/* last  */}
          <div className="flex flex-col items-center">
            <div className="w-full h-1 bg-gray-500 "></div>
            <div>
              <p>
                {" "}
                <span>&copy;</span>
                {"Made By Amit Dhiman " + new Date().getFullYear()}
              </p>
            </div>
            <div className="flex gap-2">
              <CiFacebook className="size-9" />
              <FaGithub className="size-9" />
              <FaDiscord className="size-9" />
              <FaLinkedin className="size-9" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
