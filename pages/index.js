import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Moodify - Recognition</title>
      </Head>
      <div className="min-h-screen container mx-auto flex items-center justify-center flex-col gap-10 text-white">
        <div className="w-[90%] md:w-[100%]">
          <h1 className="text-blue-800 font-bold text-2xl md:text-4xl text-center mb-4">
            Welcome to moodify
          </h1>
          <p className="text-blue-300 max-w-[100ch] text-center mx-auto">
            Let your face do the talking and let us find the music that matches
            your mood. Our advanced facial emotion detection technology analyzes
            your emotions and recommends the perfect playlist for you.
          </p>
        </div>
        <div className="md:w-[300px] md:h-[300px] w-[200px] h-[200px] flex items-center justify-center border border-blue-800 rounded-full overflow-hidden">
          <Image
            src="/images/face.gif"
            height={20}
            width={20}
            alt="recognition"
            className="h-full w-full object-cover"
          />
        </div>
        <Link
          href="/detection"
          className="border px-4 py-3 rounded text-[#fff] font-bold bg-gradient-to-tr from-blue-400 to-blue-600"
        >
          Start Detection
        </Link>
      </div>
    </div>
  );
}
