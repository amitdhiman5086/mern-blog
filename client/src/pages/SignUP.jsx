import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUP = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  // const [errorMessage1, setErrorMessage1] = useState(null);
  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  // console.log(formData);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    setErrorMessage(null);
    if (!formData.username || !formData.password || !formData.email) {
      setErrorMessage("Please Enter Vaild Inputs");
    }

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
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch("/api/auth/routes/signup", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.success === false) {
            setErrorMessage(result.message);
          } else {
            navigate("/");
          }
        })
        .then(() => {
          setFormData({
            username: "",
            email: "",
            password: "",
          });
          setIsloading(false);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      setErrorMessage(error.message);
      setIsloading(false);
    }
  };

  // console.log(formData.username)
  return (
    <div className="mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col items-center md:flex-row">
        {/* left */}
        <div className="">
          <Link
            to={"/"}
            className="self-center whitespace-nowrap text-sm md:text-3xl font-semibold dark:text-white"
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
            className="flex flex-col space-y-3 mt-3 md:mt-0 md:gap-2 "
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
                value={formData.username || ""}
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
                value={formData.email || ""}
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
                value={formData.password || ""}
                id="password"
              />
            </div>

            <div className="w-full  transition-all text-center rounded-lg  bg-gradient-to-r from-violet-600 to-pink-400">
              <button
                className={`w-full py-2 active:scale-90 ${
                  isLoading ? "cursor-wait" : "cursor-pointer"
                } `}
              >
                {isLoading ? "Loading.." : "SignUP"}
              </button>
            </div>
          </form>
          <div className="flex gap-3 py-3">
            <span>Have an Account ?</span>
            <Link to={"/signin"} className="text-blue-500 cursor-pointer">
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <div className=" bg-red-300 w-full rounded-lg py-3">
              <p className="text-red-600 mx-2">{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUP;
