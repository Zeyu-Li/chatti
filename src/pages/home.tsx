import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Header from "~/components/common/Header";
import { protectedPage } from "~/utils/protectedPage";
import Link from "next/link";
import Button from "~/components/common/Button";
import PricingTable from "~/components/PricingTable";
import { useState } from "react";
import { useRouter } from "next/router";

const NoChats = () => {
  return (
    <div className="text-center">
      <div>
        <p className="text-6xl text-textPrimary">No chats yet 🥺</p>
        {/* image of girl */}
        <div className="m-8">
          <img
            src="/_protected/profile.png"
            alt="screenshot"
            className="m-auto w-1/4 rounded-full border-2 border-textPrimary -md:w-full"
          />
        </div>
      </div>
      <Button text="Create a chat" />
    </div>
  );
};

export default function Home() {
  const router = useRouter();
  const [upgradeScreen, setUpgradeScreen] = useState(false);

  const { data: sessionData } = useSession();
  const { data: chatData } = api.getChats.getAllChats.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const newChatMutation = api.getChats.createNewChat.useMutation();

  // const { data: secretMessage } = api.example.getSecretMessage.useQuery(
  //   undefined, // no input
  //   { enabled: sessionData?.user !== undefined }
  // );

  const newChat = async () => {
    const mutationResponse = await newChatMutation.mutateAsync();
    // push /chat/[chatId] to router
    if (mutationResponse) {
      router.push(`/chat/${mutationResponse.id}`);
    } else {
      setUpgradeScreen(false);
    }
  };

  return (
    <>
      <Header session={sessionData} />
      <main className="flex min-h-screen flex-col bg-primary pt-24">
        <div id="home" className="w-full text-textPrimary">
          <div className="m-auto h-full w-full max-w-6xl px-2 py-16 -lg:px-8">
            <h2 className="mb-8 text-5xl font-semibold">
              Welcome back {sessionData?.user?.name}
            </h2>
            {/* Table of chat logs */}
            <div className="w-full rounded-xl border-2 border-textPrimary text-textPrimary">
              <div className="p-8">
                <table className="w-full table-auto border-collapse text-xl">
                  <thead className="border-b-2 border-textPrimary text-left font-semibold">
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Last Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chatData?.map((chat) => (
                      <tr
                        key={chat.id}
                        className="my-4 cursor-pointer"
                        onClick={() => router.push(`/chat/${chat.id}`)}
                        title={`Click to open chat ${chat.personId}`}
                      >
                        <td>
                          {/* <Link href={`/chat/${chat.id}`}> */}
                          <img
                            src="/_protected/profile.png"
                            alt="screenshot"
                            className="h-12 w-12 rounded-full border-2 border-textPrimary p-2"
                          />
                          {/* </Link> */}
                        </td>
                        <td>{chat.personId}</td>
                        <td>{chat.dateUpdated.toDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {chatData?.length ? null : (
                  <div className="pt-8 text-center">
                    <div>
                      <p className="text-6xl text-textPrimary">
                        No chats yet 🥺
                      </p>
                      {/* image of girl */}
                      <div className="m-8">
                        <img
                          src="/_protected/profile.png"
                          alt="screenshot"
                          className="m-auto w-1/4 rounded-full border-2 border-textPrimary -md:w-full"
                        />
                      </div>
                    </div>
                    <div onClick={() => setUpgradeScreen(true)}>
                      <Button text="Create a Chat" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* <p className="text-center text-2xl text-textPrimary">
          {secretMessage && <span>{secretMessage}</span>}
        </p> */}
      </main>

      {/* upgrade screen modal */}
      {upgradeScreen && (
        <div className="fixed left-0 top-0 z-50 h-screen w-screen overflow-y-auto bg-primary">
          <div className="m-auto max-w-6xl">
            <PricingTable
              setUpgradeScreen={setUpgradeScreen}
              newChat={newChat}
            />
          </div>
        </div>
      )}
    </>
  );
}

// export async function getServerSideProps({ req, res }: any) {
//   return protectedPage(req, res);
// }
