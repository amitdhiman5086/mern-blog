import {
  GiCrossFlare,
  GiCrossMark,
  GiHamburgerMenu,
  GiMoon,
  GiSun,
} from "react-icons/gi";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const Header = () => {
  const [isVisible, setVisible] = useState(false);
  const [isDark, setDark] = useState(false);

  const handleToggle = () => {
    setVisible(!isVisible);
    // console.log(isVisible);
  };
  const handleDarkMode = () => {
    setDark(!isDark);
    // console.log(isDark);
  };
  return (
    <nav>
      <div className="flex justify-between px-8 py-5 items-center">
        <div>
          <Link
            to={"/"}
            className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-violet-400 to-pink-300 rounded-lg text-white ">
              Zoo's
            </span>
            Blog
          </Link>
        </div>

        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Search.."
            className="rounded-l-lg  hidden sm:inline"
          />
          <div className="bg-gray-300  sm:rounded-r-lg rounded-lg">
            <CiSearch className="m-2  size-6" />
          </div>
        </div>

        <div>
          <ul className="  sm:flex gap-4 font-semibold  hidden">
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/project"}>Project</Link>
          </ul>
        </div>
        <div className="flex gap-3">
          <Link
            to={"/signin"}
            className="px-4 py-2 bg-gradient-to-r from-violet-500 via-blue-400 to-pink-600 text-white font-semibold rounded-xl"
          >
            Sign In
          </Link>
          <button className="">
            {isDark ? (
              <GiMoon
                onClick={handleDarkMode}
                className="size-9 -rotate-45  "
              />
            ) : (
              <GiSun onClick={handleDarkMode} className="size-9 -rotate-45  " />
            )}
          </button>
        </div>

        {!isVisible ? (
          <h2 className="cursor-pointer  sm:hidden" onClick={handleToggle}>
            <GiHamburgerMenu />
          </h2>
        ) : (
          <h2 className="cursor-pointer  sm:hidden" onClick={handleToggle}>
            <GiCrossMark />
          </h2>
        )}
      </div>
      <div>
        {isVisible && (
          <div className="  text-center ">
            <ul className=" sm:hidden flex flex-col  gap-4 font-semibold  ">
              <Link className="hover-effect " to={"/"}>
                Home
              </Link>
              <Link className="hover-effect" to={"/about"}>
                About
              </Link>
              <Link className="hover-effect" to={"/project"}>
                Project
              </Link>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
