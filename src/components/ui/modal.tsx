import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

type CrossModalProps = {
  title: string;
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CrossModal = ({ title, message, open, setOpen }: CrossModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    console.log("Inside the model, open is: ", open);
    if (open && !ref.current?.open) {
      ref.current?.showModal();
    }

    return () => {
      ref.current?.close();
    };
  }, [ref.current]);

  return (
    <dialog ref={ref} id="cross-modal" className="modal">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        method="dialog"
        className="modal-box bg-black outline outline-1 outline-slate-500"
      >
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
      </form>
    </dialog>
  );
};

type ActionModalModes =
  | {
      mode: "button";
      label: string;
      onClick?: () => any;
    }
  | {
      mode: "link";
      label: string;
      href: string;
    };

type ActionModalProps = {
  title: string;
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  left?: ActionModalModes;
  right: ActionModalModes;
};

export const ActionModal = ({
  title,
  message,
  left,
  right,
  open,
  setOpen,
}: ActionModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    console.log("Inside the model, open is: ", open);
    if (open && !ref.current?.open) {
      ref.current?.showModal();
    }

    return () => {
      ref.current?.close();
    };
  }, [ref.current]);

  return (
    <dialog
      ref={ref}
      id="popup"
      className="modal modal-bottom sm:modal-middle"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
        method="dialog"
        className="modal-box bg-black outline outline-1 outline-slate-500 "
      >
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="py-4">{message}</p>
        <div className="modal-action flex justify-between items-center">
          {left &&
            (left.mode === "button" ? (
              <button className="btn btn-sm lg:btn-md w-24 bg-white/90 text-black hover:bg-white" type="submit" onClick={left.onClick}>
                {left.label}
              </button>
            ) : (
              <Link href={left.href} className="btn btn-sm lg:btn-md w-24 bg-white/90 text-black hover:bg-white">
                {left.label}
              </Link>
            ))}
          {right.mode === "button" ? (
            <button className="btn btn-sm lg:btn-md w-24 bg-white/90 text-black hover:bg-white" type="submit" onClick={right.onClick}>
              {right.label}
            </button>
          ) : (
            <Link href={right.href} className="btn btn-sm lg:btn-md w-24 bg-white/90 text-black hover:bg-white">
              {right.label}
            </Link>
          )}
        </div>
      </form>
    </dialog>
  );
};

export const useCrossModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const openModal = (title: string, message: string) => {
    setTitle(title);
    setMessage(message);
    setOpen(true);
  };

  const closeModal = () => {
    setTitle("");
    setMessage("");
    setOpen(false);
  };

  return {
    openModal,
    Modal: () => (
      <CrossModal
        open={open}
        setOpen={setOpen}
        title={title}
        message={message}
      />
    ),
  };
};

export const useActionModal = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState<"button" | "link">("button");

  const openModal = (
    title: string,
    message: string,
    mode: "button" | "link" = "button"
  ) => {
    setTitle(title);
    setMessage(message);
    setMode(mode);
    setOpen(true);
  };

  return {
    openModal,
    Modal: ({
      left,
      right,
    }: {
      left: ActionModalModes;
      right: ActionModalModes;
    }): JSX.Element => (
      <ActionModal
        open={open}
        setOpen={setOpen}
        title={title}
        message={message}
        left={left}
        right={right}
      />
    ),
  };
};
