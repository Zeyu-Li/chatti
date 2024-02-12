import Link from "next/link";

const LinkIcon: React.FC<{
  href: string;
  title: string;
  children: React.ReactNode;
}> = ({ href, title, children }) => {
  return (
    <Link
      href={href}
      title={title}
      target="_blank"
      className="mx-2 hover:text-secondary"
    >
      {children}
    </Link>
  );
};

const Footer: React.FC = () => {
  return (
    <footer
      id="footer"
      className="w-full bg-textPrimary text-center text-3xl text-textSecondary -lg:px-8 -sm:text-xl"
    >
      <div className="m-auto flex h-full w-full max-w-6xl flex-row justify-between py-8">
        <p>
          {/* copyright */}
          <span className="text-2xl">© Chatti</span>
        </p>
        <Link
          href="/login"
          className="text-2xl font-bold text-textSecondary transition-all hover:text-textSecondaryHover"
        >
          Login
        </Link>
      </div>
    </footer>
  );
};
export default Footer;
