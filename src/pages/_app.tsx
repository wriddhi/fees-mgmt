import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { Overpass_Mono } from "next/font/google";

import { AuthContextProvider } from "@/contexts/auth";

const overpassMono = Overpass_Mono({
  variable: "--font-mono",
  style: "normal",
  subsets: ["latin-ext"],
});

const gilroy = localFont({
  src: [
    {
      path: "../../public/Gilroy-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/Gilroy-Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/Gilroy-SemiBold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/Gilroy-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/Gilroy-ExtraBold.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-gilroy",
  style: "normal",
});

const cirka = localFont({
  src: [
    {
      path: "../../public/PPCirka-Semibold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/PPCirka-Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-cirka",
  style: "normal",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <main
        className={`${gilroy.variable} ${cirka.variable} ${overpassMono.variable} font-sans w-full h-full min-h-screen bg-black bg-grid`}
      >
        <Component {...pageProps} />
      </main>
    </AuthContextProvider>
  );
}
