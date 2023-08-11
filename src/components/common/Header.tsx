import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-primary">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between border-b-[1px] border-textPrimary p-4 text-textPrimary">
        {/* logo image */}
        <Link href="/">
          <img
            src="/common/vector/playdate.svg"
            alt="PlayDate logo"
            className="h-12 w-36 cursor-pointer"
          />
        </Link>

        {/* login */}
        <Link
          href="/login"
          className="text-2xl font-bold text-textPrimary transition-all hover:text-textPrimaryHover"
        >
          Login
        </Link>
      </div>
    </header>
  );
};
export default Header;
