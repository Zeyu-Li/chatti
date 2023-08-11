import Link from "next/link";
import React from "react";

interface Props {
  text: string;
}

const Button: React.FC<Props> = ({ text }) => {
  return (
    <button
      title={text}
      className="rounded-full border-2 border-textPrimary px-10 py-3 text-2xl text-textPrimary no-underline transition"
    >
      {text}
    </button>
  );
};

export default Button;
