import { useAuth } from "@/contexts/auth";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

export default function UnauthorizedAccess({ ip }: { ip: string }) {
  const { logout } = useAuth();

  useEffect(() => {
    logout(false);
  }, []);

  return (
    <>
      <Head>
        <title>Unauthorized access</title>
        <meta
          name="description"
          content="You are not authorized to access the fees portal"
        />
      </Head>
      <main className="text-white w-full min-h-screen flex flex-col justify-center items-center p-5 lg:p-20 gap-4">
        <h1 className="text-6xl font-cirka mb-10">
          Unauthorized Access Detected
        </h1>
        <p className="text-xl text-red-500 bg-black/50 p-1 shadow-2xl shadow-black">
          Your IP address{" "}
          <code className="text-lg font-mono mx-2 outline-1 outline outline-amber-500 text-amber-500 p-1 bg-black">
            {ip}
          </code>{" "}
          has been logged and this incident will be reported to the administrator.
        </p>
        <p className="text-slate-300">
          Please note that attempting to gain unauthorized access to the fees
          portal is strictly prohibited and may result in legal action.
        </p>
        <Link className="backlight p-4 mt-10 text-xl font-bold " href="/login">
          Return to Login
        </Link>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async ({
  req,
  res,
}) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  return {
    props: { ip },
  };
};
