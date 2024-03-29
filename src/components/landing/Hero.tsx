import Link from "next/link";
import Button from "../common/Button";

const Hero: React.FC = () => {
  return (
    <div className="w-full max-w-6xl -lg:px-8">
      <div className="flex h-screen w-full flex-row items-center -lg:flex-col">
        <div className="fadeIn flex flex-1 flex-col -lg:pt-32" id="top">
          <h1 className="text-7xl font-bold -lg:text-6xl">
            Collaborate with a Buddy
          </h1>
          <h2 className="py-8 text-4xl font-bold text-textPrimary/90">
            Your AI Friend
          </h2>
          <div>
            {/* call to action button of try now styled like mailchimp */}
            {/* popout on hover */}
            <Link href="/login">
              <Button text={"Try Now >"} />
            </Link>
          </div>
        </div>
        <div className="flex flex-1 justify-end">
          <video
            autoPlay
            loop
            muted
            className="h-full"
            src="/common/animation/wave.webm"
          />
        </div>
      </div>
    </div>
  );
};
export default Hero;
