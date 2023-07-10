import { useAuth } from "@/contexts/auth";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

export default function UnauthorizedAccess({ip}: {ip: string}) {
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
      <main className="text-white w-full min-h-screen flex flex-col justify-center items-center p-5 lg:p-20 lg:gap-20">
        <div className="text-2xl text-center lg:mx-20 font-bold">
          You have tried to access a page you are not authorized to access by
          modifying cookies. <br /> This is a security breach and your IP has
          been logged. {ip}
        </div>
        <Link className="backlight p-4 font-bold" href="/login">
          Return to Login
        </Link>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<any> = async ({ req, res }) => {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  return {
    props: {ip},
  };
}
