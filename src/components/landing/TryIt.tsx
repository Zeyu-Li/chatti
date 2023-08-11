import Link from "next/link";
import Button from "../common/Button";

const TryIt: React.FC = () => {
  return (
    <div id="try" className="w-full text-center text-textPrimary">
      <div className="m-auto flex h-full w-full max-w-6xl flex-col items-center justify-center py-16 font-semibold -lg:px-8">
        <h2 className="text-7xl">Talk to your Date</h2>
        <span className="inline pb-12">
          <p className="inline text-8xl"> </p>
          <p className="grow-in-text-size inline">Now</p>
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
