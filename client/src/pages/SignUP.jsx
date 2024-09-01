import { useState } from "react";
import { Link } from "react-router-dom";

const SignUP = () => {
  const [formData, setFormData] = useState({});
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const res = await fetch("/api/auth/routes/signup", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     username: formData.username,
      //     email: formData.email,
      //     password: formData.password,
      //   }),
      // });
      // // const data = await res.text();
      // const data1 = await res.json();

      // // console.log(data);
      // console.log(data1);


      const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "username": formData.username,
  "email":formData.email,
  "password": formData.password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("http://localhost:3000/api/auth/routes/signup", requestOptions)
  .then((response) => response.json())
  .then((result) => console.log(result))
  .then(()=>setFormData({}))
  .catch((error) => console.error(error));




    } catch (error) {
      console.log(error);
    }
  };

  // console.log(formData.username)
  return (
    <div className="mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row">
        {/* left */}
        <div className="">
          <Link
            to={"/"}
            className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
          >
            <span className="px-2 py-1 bg-gradient-to-r from-violet-400 to-pink-300 rounded-lg text-white ">
              Zoo's
            </span>
            Blog
          </Link>
          <p className="text-sm mt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. A quam
            magnam aspernatur ad eligendi qui, iure voluptatem dolore blanditiis
            eaque aliquid sapiente vitae ullam illo maiores ut? Dicta, provident
            magni?
          </p>
        </div>
        <div>
          {/* right */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-3 mt-3 md:mt-0 md:gap-4  "
          >
            <div className="flex flex-col">
              <label className="font-semibold text-xl" htmlFor="username">
                Your Username
              </label>
              <input
                className="rounded-lg text-black"
                onChange={handleFormData}
                type="text"
                placeholder="Username"
                id="username"
                // value={formData.}
                // value={`${formData.username}`}
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold  text-xl" htmlFor="email">
                Your Email
              </label>
              <input
                className="rounded-lg text-black"
                type="email"
                onChange={handleFormData}
                placeholder="Email"
                id="email"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold text-xl" htmlFor="password">
                Your Password
              </label>
              <input
                className="rounded-lg text-black"
                type="password"
                onChange={handleFormData}
                placeholder="Password"
                id="password"
              />
            </div>
            <div className="w-full active:scale-90 transition-all text-center rounded-lg  bg-gradient-to-r from-violet-600 to-pink-400">
              <button className="py-2 ">Sign Up</button>
            </div>
          </form>
          <div className="flex gap-3 py-3">
            <span>Have an Account ?</span>
            <Link to={"/signin"} className="text-blue-500 cursor-pointer">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUP;
