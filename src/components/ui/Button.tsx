import React from "react";
import LoadingDots from "./loading-dots";

interface ButtonProps extends React.ButtonHTMLAttributes<any> {
  theme?: "light" | "dark";
  size?: "sm" | "lg";
  icon?: JSX.Element;
  title: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({
  type,
  title,
  theme = "light",
  size = "lg",
  icon,
  loading,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={loading || disabled}
      type={type}
      onClick={onClick}
      className={` disabled:cursor-progress min-w-full max-w-xs
      ${
        theme == "light"
          ? "bg-white/95 hover:bg-white text-black disabled:bg-white/80"
          : "bg-black/95 hover:bg-black text-white disabled:bg-black/80"
      }
       font-bold ${
         size == "lg" ? "text-lg p-2 h-10" : "text-sm p-2"
       } flex justify-center items-center gap-2 `}
    >
      {!loading ? (
        <>
          {title} {icon}
        </>
      ) : (
        <LoadingDots />
      )}
    </button>
  );
};

export default Button;
