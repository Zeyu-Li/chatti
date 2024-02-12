import Link from "next/link";
import Button from "../common/Button";
import ScrollAnimation from "react-animate-on-scroll";

const TryIt: React.FC = () => {
  return (
    <div id="try" className="w-full text-center text-textPrimary">
      <div className="m-auto flex h-full w-full max-w-6xl flex-col items-center justify-center py-16 font-semibold -lg:px-8">
        <h2 className="text-7xl">Talk to your AI Buddy</h2>
        <span className="inline pb-12">
          <p className="inline text-8xl"> </p>
          <ScrollAnimation animateIn="grow-in-text-size" className="inline">
            <p className="inline">Now</p>
          </ScrollAnimation>
          <p className="inline text-8xl"> </p>
        </span>
        <Link href="/login">
          <Button text={"Try Now >"} />
        </Link>
      </div>
    </div>
  );
};
export default TryIt;
