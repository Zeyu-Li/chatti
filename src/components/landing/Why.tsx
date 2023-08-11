import Link from "next/link";

const Why: React.FC = () => {
  return (
    <div
      id="showcase"
      className="w-full bg-secondary text-center text-textSecondary"
    >
      <div className="m-auto flex h-full w-full max-w-6xl flex-col items-center justify-center py-16 -lg:px-8">
        <div className="flex w-full flex-1 flex-row -lg:flex-col">
          <img
            src="/common/vector/wellactually.svg"
            alt="PlayDate avatar"
            className="w-1/2 -lg:w-full -lg:pb-8"
          />
          <div className="flex w-full flex-col items-center justify-center">
            <h1 className="rounded-full rounded-tl-none border-2 border-textSecondary p-12 text-7xl font-bold">
              Well actually
            </h1>
            <h2 className="py-8 text-6xl font-bold text-textSecondary/95">
              it improves your <br className="-lg:hidden" />
              rizz
            </h2>
            {/* <div>
              <Link href="/login">
                <button className="rounded-full border-2 border-textPrimary px-10 py-3 text-2xl text-textPrimary no-underline transition">
                  Try Now {">"}
                </button>
              </Link>
            </div> */}
          </div>
        </div>
        <div className="flex flex-1 justify-end"></div>
      </div>
    </div>
  );
};
export default Why;
