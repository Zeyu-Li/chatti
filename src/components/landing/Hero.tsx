import Link from "next/link";

const Hero: React.FC = () => {
  return (
    <div className="w-full max-w-6xl -lg:px-8">
      <div className="flex h-screen w-full flex-row items-center -lg:flex-col">
        <div className="flex flex-1 flex-col -lg:pt-32" id="top">
          <div>
            <h1 className="text-7xl font-bold -lg:text-6xl">
              Dating Done Easy
            </h1>
          </div>
          <div>
            <h2 className="py-8 text-4xl font-bold text-textPrimary/90">
              Friendly Conversations
            </h2>
          </div>
          <div>
            {/* call to action button of try now styled like mailchimp */}
            {/* popout on hover */}
            <Link href="/login">
              <button className="rounded-full border-2 border-textPrimary px-10 py-3 text-2xl text-textPrimary no-underline transition">
                Try Now {">"}
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <img
            src="/common/animation/girl.png"
            alt="PlayDate avatar"
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;
