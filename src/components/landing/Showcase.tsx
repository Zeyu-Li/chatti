import Link from "next/link";

const Showcase: React.FC = () => {
  return (
    <div id="showcase" className="w-full bg-white text-center text-textPrimary">
      <div className="m-auto flex h-full w-full max-w-6xl flex-col items-center justify-center py-16 -lg:px-8">
        <h2 className="text-4xl font-semibold">
          Experience Realtime Responses
        </h2>
        {/* screenshot img */}
        <img
          src="/lighthouse.png"
          alt="screenshot"
          className="w-1/2 pt-16 -lg:w-full"
        />
      </div>
    </div>
  );
};
export default Showcase;
