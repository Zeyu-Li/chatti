import Link from "next/link";
import React from "react";

interface Props {
  text: string;
}

const Button: React.FC<Props> = ({ text }) => {
  return (
    <button
      title={text}
      className="button-animation rounded-full border-2 border-textPrimary px-10 py-3 text-2xl text-textPrimary no-underline transition-all"
    >
      {text}
    </button>
  );
};

export default Button;
