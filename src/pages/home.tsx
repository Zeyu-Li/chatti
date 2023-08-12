import { api } from "~/utils/api";
import { getProviders, getSession, useSession } from "next-auth/react";
import Header from "~/components/common/Header";
import { protectedPage } from "~/utils/protectedPage";
import Link from "next/link";
import Button from "~/components/common/Button";

export default function Home() {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const { data: sessionData } = useSession();

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );
  const { data: chatData } = api.getChats.getAllChats.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  // const test = api.getChats.createNewChat.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  console.log("chats: ", chatData);
  // console.log("chats: ", test);

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col bg-primary pt-24">
        <div id="home" className="w-full text-textPrimary">
          <div className="m-auto h-full w-full max-w-6xl py-16 font-semibold -lg:px-8">
            <h2 className="mb-8 text-5xl">
              Welcome back {sessionData?.user?.name}
            </h2>
            {/* Table of chat logs */}
            <div className="w-full rounded-xl border-2 border-textPrimary text-textPrimary">
              {chatData?.length ? (
                <div>you got chats</div>
              ) : (
                <div>
                  <p className="text-center text-2xl text-textPrimary">
                    No chats yet
                  </p>
                  <Button text="Create a chat" />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <p className="text-center text-2xl text-textPrimary">
          {secretMessage && <span>{secretMessage}</span>}
        </p> */}
      </main>
    </>
  );
}

export async function getServerSideProps(context: any) {
  return protectedPage(context);
}
