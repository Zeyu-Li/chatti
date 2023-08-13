import Link from "next/link";
import ScrollAnimation from "react-animate-on-scroll";

const Showcase: React.FC = () => {
  return (
    <div id="showcase" className="w-full bg-white text-center text-textPrimary">
      <div className="m-auto flex h-full w-full max-w-6xl flex-col items-center justify-center pt-16 -lg:px-8">
        <h2 className="text-4xl font-semibold">
          Experience Realtime Responses
        </h2>
        {/* screenshot img */}
        <ScrollAnimation animateIn="fadeIn" offset={300}>
          <div>
            <img
              src="/landing/img/screenshotCropped.png"
              alt="screenshot of app"
              className="image-mask m-auto mt-16 w-4/5 rounded-3xl rounded-b-none border-2 border-textPrimary -lg:w-full"
            />
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
};
export default Showcase;
