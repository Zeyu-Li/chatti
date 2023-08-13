import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Header from "~/components/common/Header";
import { protectedPage } from "~/utils/protectedPage";
import Link from "next/link";
import Button from "~/components/common/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "~/components/common/Spinner";

export default function ChatSession() {
  const router = useRouter();
  const [currentMessage, setCurrentMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const { data: sessionData } = useSession();
  const { data: chatMessageData, isLoading } =
    api.getChats.getChatMessages.useQuery(
      {
        chatId: typeof router.query.id === "string" ? router.query.id : "",
      }, // no input
      { enabled: sessionData?.user !== undefined }
    );

  const [chatMessages, setChatMessages] = useState(chatMessageData ?? []);

  // change chatMessageData to useQueries
  const newChatMessageMutation = api.getChats.writeChatMessage.useMutation();

  useEffect(() => {
    if (!isLoading && chatMessageData) {
      setChatMessages(chatMessageData);
    }
  }, [isLoading]);

  const sendChatMessage = async () => {
    if (isTyping) {
      // cannot send message
      // shake the screen instead
      return;
    }
    // append message to chat
    setChatMessages([
      ...chatMessages,
      {
        id: "",
        sender: "/user",
        text: currentMessage,
        // @ts-ignore
        createdAt: new Date(),
      },
    ]);

    const mutationResponse = await newChatMessageMutation.mutateAsync({
      chatId: typeof router.query.id === "string" ? router.query.id : "",
      message: currentMessage,
    });
    // console.log(mutationResponse);
    // update chat messages
    setCurrentMessage("");
    setIsTyping(true);

    // depending on how long the message is, wait for a certain amount of time
    if (currentMessage.length < 10) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else if (currentMessage.length < 20) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsTyping(false);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
    // append message to chat
    setChatMessages([
      ...chatMessages,
      {
        id: "",
        sender: "/user",
        text: currentMessage,
        // @ts-ignore
        createdAt: new Date(),
      },
      {
        id: "",
        sender: "kali",
        // @ts-ignore
        text: mutationResponse.text,
        // @ts-ignore
        createdAt: new Date(),
      },
    ]);

    // await animation to finish playing
    setIsTyping(false);
  };

  return (
    <>
      <Header session={sessionData} />
      <main className="flex min-h-screen flex-col bg-primary p-4 pt-24">
        <div className="m-auto w-full text-textPrimary">
          <div className="m-auto h-full w-full max-w-6xl px-2 pt-16 font-semibold -lg:pt-8">
            <h2 className="text-5xl">Kali</h2>
          </div>
        </div>

        <div className="relative m-auto my-0 h-[60vh] w-full max-w-6xl snap-y snap-end overflow-auto rounded-xl border-2 border-textPrimary text-2xl text-textPrimary">
          <div className="pb-12">
            {/* text messages */}
            {chatMessages?.map((message) => {
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
            {/* if still fetching text message pulse loading */}
            {isLoading && (
              <span className="m-auto animate-pulse text-textPrimary">
                <Spinner />
              </span>
            )}
            {/* typing indicator */}
            {isTyping && (
              <span className="absolute bottom-0 left-0 m-4 animate-pulse px-4 py-2 text-textPrimary">
                <video
                  className="h-16 w-16"
                  autoPlay
                  loop
                  src="/common/animation/typing.webm"
                  muted
                />
              </span>
            )}
          </div>
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
            className="h-[68px] w-[72px] rounded-xl border-0 bg-teal-200 text-2xl text-textPrimary outline-none focus:outline-none"
            onClick={() => sendChatMessage()}
            title="Send Message"
          >
            ➡️
          </button>
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }: any) {
  return protectedPage(req, res);
}