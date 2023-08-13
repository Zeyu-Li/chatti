import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Header from "~/components/common/Header";
import { protectedPage } from "~/utils/protectedPage";
import Link from "next/link";
import Button from "~/components/common/Button";
import { useState } from "react";
import { useRouter } from "next/router";
import { send } from "process";
import { set } from "zod";

export default function ChatSession() {
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { data: sessionData } = useSession();
  const { data: chatMessageData } = api.getChats.getChatMessages.useQuery(
    {
      chatId: typeof router.query.id === "string" ? router.query.id : "",
    }, // no input
    { enabled: sessionData?.user !== undefined }
  );

  const newChatMessageMutation = api.getChats.writeChatMessage.useMutation();

  const sendChatMessage = async () => {
    if (isTyping) {
      // cannot send message
      // shake the screen instead
      return;
    }
    const mutationResponse = await newChatMessageMutation.mutate({
      chatId: typeof router.query.id === "string" ? router.query.id : "",
      message: currentMessage,
    });
    // update chat messages
    setCurrentMessage("");
    setIsTyping(true);
  };

  return (
    <>
      {/* <Header session={sessionData} /> */}
      <main className="flex min-h-screen flex-col bg-primary pt-24">
        <div className="m-auto w-full text-textPrimary">
          <div className="m-auto h-full w-full max-w-6xl px-2 pt-16 font-semibold -lg:pt-8">
            <h2 className="text-5xl">Kali</h2>
          </div>
        </div>

        <div className="m-auto my-0 h-[60vh] w-full max-w-6xl overflow-auto rounded-xl border-2 border-textPrimary text-2xl text-textPrimary">
          {/* text messages */}
          {chatMessageData?.map((message) => {
            if (message.sender === "/user") {
              return (
                <span key={message.id}>
                  <span className="float-right m-4 block max-w-[30%] break-words rounded-lg rounded-br-none border-2 border-textPrimary bg-teal-200 px-4 py-2 -lg:max-w-full">
                    {message.text}
                  </span>
                  <br />
                  <br />
                </span>
              );
            } else {
              return (
                <span key={message.id}>
                  <span className="float-left m-4 block max-w-[30%] break-words rounded-lg rounded-bl-none border-2 border-textPrimary px-4 py-2 text-justify -lg:max-w-full">
                    {message.text}
                  </span>
                  <br />
                  <br />
                </span>
              );
            }
          })}
        </div>
        <div className="m-auto flex w-full max-w-6xl justify-between rounded-xl border-2 border-textPrimary text-textPrimary">
          {/* input message box */}
          <input
            type="text"
            className="h-16 w-full rounded-xl border-0 bg-primary px-4 text-2xl text-textPrimary outline-none placeholder:text-textPrimary/70 focus:outline-none"
            placeholder="Say Hi!"
            onSubmit={() => sendChatMessage()}
            onChange={(e) => setCurrentMessage(e.target.value)}
            value={currentMessage}
          />
          {/* send button */}
          <button
            className="h-[68px] w-[68px] rounded-xl border-0 bg-teal-200 text-2xl text-textPrimary outline-none focus:outline-none"
            onClick={() => sendChatMessage()}
          >
            ➡️
          </button>
        </div>
      </main>
    </>
  );
}

// export async function getServerSideProps({ req, res }: any) {
//   return protectedPage(req, res);
// }
