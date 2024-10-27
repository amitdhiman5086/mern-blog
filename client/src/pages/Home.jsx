import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction";
import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/post/routes/getPosts");
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-8 py-16 px-4 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl pb-3 font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Welcome to Zoo&apos;s Coding Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-lg text-center max-w-3xl mx-auto leading-relaxed">
          Embark on a wild coding adventure! Explore our digital jungle of
          articles, tutorials, and insights on web development, software
          engineering, and cutting-edge programming languages. From taming
          complex algorithms to crafting stunning user interfaces, we&apos;ve got
          your tech safari covered.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/search"
            className="px-6 py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-500 to-teal-500 rounded-full hover:from-blue-600 hover:to-teal-600 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Explore All Posts
          </Link>
          <Link
            to="/project"
            className="px-6 py-3 text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 border-2 border-blue-600 dark:border-blue-400 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition duration-300"
          >
            View Projects
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-700 dark:text-purple-300 mb-2">
              Learn
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Dive into our comprehensive tutorials and articles.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
              Create
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Build exciting projects with our step-by-step guides.
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-2">
              Innovate
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              Stay ahead with insights on emerging tech trends.
            </p>
          </div>
        </div>
      </div>
      <div className="p-3 md:w-[50%] w-[80%] mx-auto bg-amber-100 dark:bg-slate-700">
        <CallToAction />
      </div>

      <div className="w-[90%] mx-auto p-3 flex flex-col gap-8 py-7">
        {posts && posts.length > 0 && (
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
            <div className="grid w-full mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3   gap-5">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
            <Link
              to={"/search"}
              className="text-lg text-teal-500 hover:underline text-center"
            >
              View all posts
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
