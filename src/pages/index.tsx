import Head from "next/head";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import { PiShootingStarBold } from "react-icons/pi";

export default function Home() {
  return (
    <>
      <Head>
        <title>ARS x Fees</title>
        <meta
          name="description"
          content="An online fees portal to manage your finances"
        />
      </Head>
      <main className="text-white w-full min-h-screen flex flex-col lg:flex-row justify-center items-center p-5 lg:p-20 lg:gap-20">
        <div className="flex-1 text-center w-full">
          <h1 className="text-5xl lg:text-7xl font-cirka p-10 flex flex-wrap justify-center">
            Welcome to{" "}
            <b className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-red-600">
              ARS X PAY
            </b>
          </h1>
          <p
            className="text-base font-mono tracking-tighter text-slate-300
           bg-black p-2 outline outline-1 outline-slate-500 rounded-lg
           flex
           "
          >
            <span>
              The <b className="text-white">one stop</b> solution to all your
              instution&apos;s finances
            </span>
            <PiShootingStarBold className="inline-block text-2xl ml-auto text-amber-400" />
          </p>
        </div>
        <div
          className="flex flex-col justify-center items-center gap-10 flex-1
         text-2xl bg-black p-20 outline outline-1 outline-slate-400"
        >
          <p className="text-slate-400">Login to start managing your fees</p>
          <Link
            className="backlight px-6 py-3 hover:scale-105 transition-all 
            group flex justify-center items-center gap-1 rounded-xl"
            href="/login"
          >
            Login{" "}
            <GoArrowRight className="duration-300 group-hover:translate-x-2" />
          </Link>
        </div>
      </main>
    </>
  );
}
