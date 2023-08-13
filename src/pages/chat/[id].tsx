import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import Header from "~/components/common/Header";
import { protectedPage } from "~/utils/protectedPage";
import Link from "next/link";
import Button from "~/components/common/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "~/components/common/spinner/Spinner";
import Title from "~/components/SEO/Title";

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
    const trimmedMessage = currentMessage.trim();
    if (isTyping || trimmedMessage.length === 0) {
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
        text: trimmedMessage,
        // @ts-ignore
        createdAt: new Date(),
      },
    ]);

    const mutationResponse = await newChatMessageMutation.mutateAsync({
      chatId: typeof router.query.id === "string" ? router.query.id : "",
      message: trimmedMessage,
    });
    // console.log(mutationResponse);
    // update chat messages
    setCurrentMessage("");
    setIsTyping(true);

    // @ts-ignore
    const returnMessage: string = mutationResponse.text;

    // depending on how long the message is, wait for a certain amount of time
    if (returnMessage.length < 2) {
      setIsTyping(false);
    } else if (returnMessage.length < 10) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } else if (returnMessage.length < 20) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsTyping(false);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsTyping(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } else {
      await new Promise((resolve) => setTimeout(resolve, 4000));
    }
    // append message to chat
    setChatMessages([
      ...chatMessages,
      {
        id: "",
        sender: "/user",
        text: trimmedMessage,
        // @ts-ignore
        createdAt: new Date(),
      },
      {
        id: "",
        sender: "kali",
        text: returnMessage,
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
      <Title title="PlayDate | Chatting with Kali" />
      <main className="flex min-h-screen flex-col bg-primary p-4 pt-12">
        <div className="m-auto w-full max-w-6xl text-textPrimary">
          <div className="flex h-full w-full items-end justify-between px-2 pt-16 font-semibold -lg:pt-8">
            {/* profile image */}
            <div className="flex items-end">
              <div className="mr-4">
                <img
                  src="/_protected/profile.png"
                  alt="profile"
                  className="h-20 w-20 rounded-full border-2 border-textPrimary"
                />
              </div>
              <h2 className="text-5xl">Kali</h2>
            </div>
            <Link href="/home">
              <button
                title="Back"
                className="button-animation rounded-full border-2 border-textPrimary bg-red-500 px-10 py-3 text-2xl text-textPrimary no-underline transition-all"
              >
                Back
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-girl-default relative m-auto my-0 h-[60vh] w-full max-w-6xl snap-y snap-end overflow-auto rounded-xl border-2 border-textPrimary text-2xl text-textPrimary">
          <div className="pb-12">
            {/* text messages */}
            {chatMessages?.map((message) => {
              if (message.sender === "/user") {
                return (
                  <span key={`user-${message.id}`}>
                    <span className="float-right m-4 block max-w-[30%] break-words rounded-lg rounded-br-none border-2 border-textPrimary bg-[#53ffd4] px-4 py-2 -lg:max-w-full">
                      {message.text}
                    </span>
                    <br />
                    <br />
                  </span>
                );
              } else {
                return (
                  <span key={`other-${message.id}`}>
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
              <span className="absolute left-0 m-4 animate-pulse px-4 py-2 text-textPrimary">
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
        {/* <form> */}
        <div className="m-auto flex w-full max-w-6xl justify-between rounded-xl border-2 border-textPrimary text-textPrimary">
          {/* input message box */}
          <input
            type="text"
            className="h-16 w-full rounded-xl border-0 bg-primary px-4 text-2xl text-textPrimary outline-none placeholder:text-textPrimary/70 focus:outline-none"
            placeholder="Say Hi!"
            onSubmit={() => sendChatMessage()}
            onChange={(e) => setCurrentMessage(e.target.value)}
            value={currentMessage}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendChatMessage();
              }
            }}
          />
          {/* send button */}
          <button
            className="h-[68px] w-[72px] rounded-[9px] border-0 border-l-2 border-textPrimary bg-[#53ffd4] text-2xl text-textPrimary outline-none transition-all hover:bg-[#53ffd4]/60 focus:outline-none"
            onClick={() => sendChatMessage()}
            title="Send Message"
            disabled={isTyping}
          >
            {isTyping ? "🔒" : "➡️"}
          </button>
        </div>
        {/* </form> */}
      </main>
    </>
  );
}

export async function getServerSideProps({ req, res }: any) {
  return protectedPage(req, res);
}
