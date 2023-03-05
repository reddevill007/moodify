import Head from "next/head";
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Spotify Recognition</title>
      </Head>
      <div className="bg-black min-h-screen w-full flex items-center justify-center flex-col gap-24 text-white">
        <div className="relative w-[600px] flex items-center justify-center">
          <div className="w-16 h-16 border-b-0 border-r-0 absolute top-0 left-0 border-[8px] border-[#00bcd4]"></div>
          <div className="w-16 h-16 border-l-0 border-b-0 absolute top-0 right-0 border-[8px] border-[#00bcd4]"></div>
          <div className="w-16 h-16 border-t-0 border-r-0 absolute bottom-0 left-0 border-[8px] border-[#00bcd4]"></div>
          <div className="w-16 h-16 border-t-0 border-l-0 absolute bottom-0 right-0 border-[8px] border-[#00bcd4]"></div>
          <img src="/images/recognition.gif" alt="recognition" />
        </div>
        <Link
          href="/detection"
          className="border px-4 py-3 rounded border-[#00bcd4] text-[#00bcd4]"
        >
          Start Detection
        </Link>
      </div>
    </div>
  );
}

/*
<div className="bg-black min-h-screen w-full flex items-center justify-center flex-col gap-24 text-white">
      <div className="relative w-[600px] flex items-center justify-center">
        <div className="w-16 h-16 border-b-0 border-r-0 absolute top-0 left-0 border-[8px] border-[#00bcd4]"></div>
        <div className="w-16 h-16 border-l-0 border-b-0 absolute top-0 right-0 border-[8px] border-[#00bcd4]"></div>
        <div className="w-16 h-16 border-t-0 border-r-0 absolute bottom-0 left-0 border-[8px] border-[#00bcd4]"></div>
        <div className="w-16 h-16 border-t-0 border-l-0 absolute bottom-0 right-0 border-[8px] border-[#00bcd4]"></div>
        <img src="/images/recognition.gif" alt="recognition" />
      </div>
      <Link
        href="/detection"
        className="border px-4 py-3 rounded border-[#00bcd4] text-[#00bcd4]"
      >
        Start Detection
      </Link>
    </div>
*/
