import React from "react";
import LoadingDots from "./loading-dots";

interface ButtonProps extends React.ButtonHTMLAttributes<any> {
  theme?: "light" | "dark";
  title: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({
  type,
  title,
  theme = "light",
  loading,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={loading || disabled}
      type={type}
      onClick={onClick}
      className={`p-2 disabled:cursor-progress w-full max-w-[8rem] h-10
      ${
        theme == "light"
          ? "bg-white/95 hover:bg-white text-black disabled:bg-white/80"
          : "bg-black/95 hover:bg-black text-white disabled:bg-black/80"
      }
       font-bold text-lg flex justify-center items-center gap-2 `}
    >
      {!loading ? title : <LoadingDots />}
    </button>
  );
};

export default Button;
