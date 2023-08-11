import { type NextPage } from "next";
import Link from "next/link";
import Button from "../components/common/Button";
import Header from "../components/common/Header";
import Title from "../components/SEO/Title";

const Custom404: NextPage = () => {
  return (
    <>
      <Title title="PlayDate | Lost in Action" />
      <Header />
      <main className="backgroundPile flex min-h-screen items-center justify-center bg-primary">
        <div className="m-auto flex max-w-4xl justify-center p-8 text-4xl -sm:flex-col">
          <div>
            <h1 className="my-8 text-7xl font-bold text-secondary -sm:my-4 -sm:text-5xl">
              Page 404
            </h1>
            <h2 className="my-8 text-5xl text-secondary/80 -sm:my-4 -sm:text-3xl">
              This page must{"'"}ve been stolen by a pirate 🦜
            </h2>
            <Link href="/">
              <Button text={"Take me Home →"} />
            </Link>
          </div>
          <div className="flex h-[40vh] w-[40vh] items-center justify-center">
            <img
              src="/common/animation/girl.png"
              alt="PlayDate avatar"
              className="h-full"
            />
          </div>
        </div>
      </main>
    </>
  );
};
export default Custom404;
