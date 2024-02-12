import { type NextPage } from "next";
import Link from "next/link";
import Button from "../components/common/Button";
import Header from "../components/common/HeaderSessionAuto";
import Title from "../components/SEO/Title";

const Custom404: NextPage = () => {
  return (
    <>
      <Title title="Chatti | Lost in Action" />
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-primary">
        <div className="w-full max-w-6xl  -lg:px-8">
          <div className="flex h-screen w-full flex-row items-center -lg:flex-col">
            <div className="flex flex-1 flex-col -lg:pt-32" id="top">
              <div>
                <h1 className="text-6xl font-bold -lg:text-6xl">
                  Looks like you{"'"}re lost
                </h1>
              </div>
              <div>
                <h2 className="py-8 text-4xl font-bold text-textPrimary/90">
                  Turn back now!
                </h2>
              </div>
              <div>
                {/* call to action button of try now styled like mailchimp */}
                {/* popout on hover */}
                <Link href="/">
                  <Button text={"Take me Home →"} />
                </Link>
              </div>
            </div>
            <div className="flex flex-1 justify-end">
              <img
                src="/common/image/girl.png"
                alt="Chatti avatar"
                className="h-full"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Custom404;
