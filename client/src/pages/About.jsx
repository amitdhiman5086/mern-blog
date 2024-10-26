export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Zoo&apos;s Blog
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to Zoo Tales Blog! This blog was created by the dedicated team
              at our local zoo as a way to share fascinating stories, educational content,
              and behind-the-scenes glimpses of our animal residents. Our goal is to
              inspire a love for wildlife and promote conservation efforts.
            </p>

            <p>
              On this blog, you'll find weekly updates featuring animal spotlights,
              conservation news, and fun facts about various species. Our zookeepers
              and wildlife experts are always discovering new things, so be sure to
              check back often for exciting new content!
            </p>

            <p>
              We encourage you to leave comments on our posts and engage with
              other animal enthusiasts. You can like other people's comments and
              reply to them as well. We believe that building a community of wildlife
              lovers can help raise awareness and make a positive impact on animal
              conservation efforts worldwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
