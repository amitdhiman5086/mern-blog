import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className='min-h-screen max-w-4xl mx-auto flex justify-center items-center flex-col gap-8 p-6'>
      <h1 className='text-5xl  font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text pb-4'>Exciting Projects</h1>
      <p className='text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl'>
        Embark on a journey of creativity and innovation! Dive into our collection of fun and engaging projects that will sharpen your skills in HTML, CSS, and JavaScript.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full my-8'>
        <div className='bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-3'>Interactive Websites</h2>
          <p className='text-gray-700 dark:text-gray-300'>Create dynamic and responsive web applications that engage users.</p>
        </div>
        <div className='bg-gradient-to-br from-green-100 to-teal-100 dark:from-green-900 dark:to-teal-900 p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-green-700 dark:text-green-300 mb-3'>Game Development</h2>
          <p className='text-gray-700 dark:text-gray-300'>Build exciting browser-based games and learn game logic implementation.</p>
        </div>
        <div className='bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-yellow-700 dark:text-yellow-300 mb-3'>API Integration</h2>
          <p className='text-gray-700 dark:text-gray-300'>Connect your projects to real-world data and services using APIs.</p>
        </div>
        <div className='bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900 dark:to-pink-900 p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-semibold text-red-700 dark:text-red-300 mb-3'>Animation Mastery</h2>
          <p className='text-gray-700 dark:text-gray-300'>Learn to create stunning animations and transitions for your web projects.</p>
        </div>
      </div>
      <CallToAction />
    </div>
  )
}