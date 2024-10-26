export default function About() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <div>
          <h1 className="text-3xl font font-semibold text-center my-7">
            About Zoo&apos;s Blog
          </h1>
          <div className="text-md text-gray-500 flex flex-col gap-6">
            <div className="mb-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                Dive into the Digital Jungle at Zoo&apos;s Coding Blog!
              </h2>
              <p className="mb-4">
                🚀 Embark on a wild coding adventure with us! Our blog is the brainchild of{" "}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  tech-savvy explorers
                </span>{" "}
                who are passionate about unraveling the mysteries of the digital realm.
              </p>
              <p>
                From decoding the latest{" "}
                <span className="italic font-medium text-indigo-600 dark:text-indigo-400">
                  AI algorithms
                </span>{" "}
                to crafting{" "}
                <span className="italic font-medium text-orange-600 dark:text-orange-400">
                  stunning user interfaces
                </span>
                , we're here to guide you through the dense forest of modern technology. Our mission? To{" "}
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text font-bold">
                  ignite the coding spark in every curious mind
                </span>{" "}
                and cultivate a thriving ecosystem of digital innovators.
              </p>
            </div>

            <div className="mb-8 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">Explore Our Tech Universe</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold text-purple-700 dark:text-purple-300 mb-2">Cutting-Edge Tutorials</h3>
                  <p>Master the latest technologies with our step-by-step guides.</p>
                </div>
                <div className="bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Industry Insights</h3>
                  <p>Stay ahead with our analysis of emerging tech trends.</p>
                </div>
                <div className="bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 p-4 rounded-lg shadow-md">
                  <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Code Challenges</h3>
                  <p>Sharpen your skills with our weekly programming puzzles.</p>
                </div>
              </div>
              <p className="mt-6">
                Our passionate team of tech innovators is constantly pushing the boundaries of what's possible in code. 
                <span className="font-semibold text-indigo-600 dark:text-indigo-400"> Join us on this exciting journey </span> 
                and be part of shaping the future of technology!
              </p>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We encourage you to engage with our content by leaving comments
              and interacting with fellow coding enthusiasts. You can:
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
                  <span className="font-medium text-purple-700 dark:text-purple-300">
                    ✓ Upvote insightful comments
                  </span>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900 p-2 rounded-lg">
                  <span className="font-medium text-indigo-700 dark:text-indigo-300">
                    ✓ Participate in code discussions
                  </span>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
                  <span className="font-medium text-blue-700 dark:text-blue-300">
                    ✓ Contribute your own ideas
                  </span>
                </div>
                <div className="bg-cyan-100 dark:bg-cyan-900 p-2 rounded-lg">
                  <span className="font-medium text-cyan-700 dark:text-cyan-300">
                    ✓ Share your coding projects
                  </span>
                </div>
              </div>
              By building a vibrant community of tech-savvy individuals, we aim
              to accelerate learning and drive forward the future of software
              development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
