import {  CiInstagram } from "react-icons/ci";
import { FaDiscord, FaGithub, FaLinkedin } from "react-icons/fa";
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
                Zoo&apos;s
              </span>
              Blog
            </Link>
          </div>
          {/* right */}
          <div className="flex gap-3 md:gap-0 flex-wrap">
            <div className=" flex-auto w-32">
              {/* 1 */}

              <Link
                to={"/about"}
                className="text-gray-400  font-semibold text-2xl"
              >
                About Us
              </Link>
              <ul className="font-light">
                <li>
                  <Link
                    to="https://drive.google.com/file/d/106P-pMOIfpfmrwwzATHr5TmsfAK0q1RZ/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Resume
                  </Link>
                </li>
              </ul>
            </div>
            <div className="flex-auto w-32">
              {/* 2 */}
              <h4 className="text-gray-400  font-semibold text-2xl">
                Follow Us
              </h4>
              <ul className="font-light ">
                <li>
                  <Link
                    to="https://github.com/amitdhiman5086"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </Link>
                </li>
                <li><Link to="https://discord.com/users/amitdhiman123" target="_blank" rel="noopener noreferrer">Discord</Link></li>
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
              <Link to="https://www.instagram.com/amit.dhiman.04/" target="_blank" rel="noopener noreferrer">
                <CiInstagram className="size-9" />
              </Link>
              <Link to="https://github.com/amitdhiman5086" target="_blank" rel="noopener noreferrer">
                <FaGithub className="size-9" />
              </Link>
              <Link to="https://discord.com/users/amitdhiman123" target="_blank" rel="noopener noreferrer">
                <FaDiscord className="size-9" />
              </Link>
              <Link to="https://www.linkedin.com/in/amitdhiman2004/" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="size-9" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
