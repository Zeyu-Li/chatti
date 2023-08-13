import Link from "next/link";
import React from "react";
import CONSTANTS from "./constants/constants";

interface Props {
  setUpgradeScreen: React.Dispatch<React.SetStateAction<boolean>>;
  newChat: () => void;
}

interface PricingProp {
  cardName: string;
  cardDescription: string;
  price: number;
  length: string;
  points: string[];
  ButtonComponent: React.FC;
  popular?: boolean;
}

const PricingCard: React.FC<PricingProp> = ({
  cardName,
  cardDescription,
  price,
  length,
  points,
  ButtonComponent,
  popular = false,
}) => {
  return (
    <div
      className={`flex h-full max-w-lg flex-col justify-between rounded-lg border border-textPrimary p-6 text-center xl:p-8 ${
        popular
          ? "bg-secondary text-textSecondary"
          : "bg-white text-textPrimary"
      }`}
    >
      <div>
        <h3 className="mb-4 text-2xl font-semibold">{cardName}</h3>
        <p
          className={`font-light  sm:text-lg ${
            popular ? "text-textSecondary/90" : "text-textPrimary/90"
          }`}
        >
          {cardDescription}
        </p>
        <div className="my-8 flex items-baseline justify-center">
          <span className="mr-2 text-5xl font-extrabold">${price}</span>
          {length ? (
            <span
              className={popular ? "text-textSecondary/70" : "text-gray-500"}
            >
              /{length}
            </span>
          ) : (
            ""
          )}
        </div>
        {/* List */}
        <ul role="list" className="mb-8 space-y-4 text-left">
          {points.map((point, index) => (
            <li className="flex items-center space-x-3" key={index}>
              {/* Icon */}
              <svg
                className="h-5 w-5 flex-shrink-0 text-green-500 dark:text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <ButtonComponent />
    </div>
  );
};

const PricingTable: React.FC<Props> = ({ setUpgradeScreen, newChat }) => {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
      {/* close box */}
      <div className="flex w-full justify-end">
        <div
          className="flex h-24 w-24 cursor-pointer items-center justify-end rounded-full bg-primary/10"
          onClick={() => setUpgradeScreen(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-textPrimary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
      <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-textPrimary">
          Get Unlimited Chats!
        </h2>
        <p className="mb-5 font-light text-textPrimary/90">
          Start talking unlimited today
        </p>
      </div>
      <div className="space-y-8 sm:gap-6 lg:grid lg:grid-cols-3 lg:space-y-0 xl:gap-10">
        {/* Pricing Card */}
        <PricingCard
          cardName="Free Trial"
          cardDescription="Best to give it a test run"
          price={0}
          length=""
          points={["Up to 30 messages", "1 Chat Room"]}
          ButtonComponent={() => (
            <button
              onClick={newChat}
              title={"Try for free"}
              className={`button-animation rounded-full border-2 border-textPrimary px-10 py-3 text-2xl no-underline transition-all ${
                false
                  ? "bg-primary text-textPrimary"
                  : "bg-secondary text-textSecondary"
              }`}
            >
              {"Try for Free >"}
            </button>
          )}
        />
        <PricingCard
          cardName="Monthly Plan"
          cardDescription="Charge by month"
          price={10}
          length="month"
          points={[
            "Unlimited messages",
            "Unlimited Chat Room",
            "Unlock new Characters (Soon)",
          ]}
          ButtonComponent={() => (
            <Link href={CONSTANTS.STRIPE_LIVE_URL_MONTHLY} target="_blank">
              <button
                title={"Get Started >"}
                className={`button-animation rounded-full border-2 border-textPrimary px-10 py-3 text-2xl no-underline transition-all ${
                  false
                    ? "bg-primary text-textPrimary"
                    : "bg-secondary text-textSecondary"
                }`}
              >
                {"Get Started >"}
              </button>
            </Link>
          )}
        />
        <PricingCard
          popular={true}
          cardName="(Popular) Yearly Plan"
          cardDescription="Charge by year"
          price={100}
          length="year"
          points={[
            "Unlimited messages",
            "Unlimited Chat Room",
            "Unlock new Characters (Soon)",
            "Save 20%",
          ]}
          ButtonComponent={() => (
            <button
              title={"Get Started >"}
              className={`button-animation rounded-full border-2 border-textPrimary px-10 py-3 text-2xl no-underline transition-all ${
                true
                  ? "bg-primary text-textPrimary"
                  : "bg-secondary text-textSecondary"
              }`}
            >
              {"Get Started >"}
            </button>
          )}
        />
      </div>
    </div>
  );
};

export default PricingTable;
