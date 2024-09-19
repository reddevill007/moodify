import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Moodify - Recognition</title>
      </Head>
      <div className="container flex flex-col items-center justify-center min-h-screen gap-10 mx-auto text-white">
        <div className="w-[90%] md:w-[100%] flex flex-col items-center justify-center mt-20">
          <h1 className="mb-4 text-2xl font-bold text-center text-white md:text-4xl ">
            Welcome to Moodify
          </h1>
          <p className="text-gray-300 max-w-[100ch] text-center mx-auto mt-3">
            Let your face do the talking and let us find the music that matches
            your mood. Our advanced facial emotion detection technology analyzes
            your emotions and recommends the perfect playlist for you.
          </p>
          <Link
            href="/detection"
            className="bg-[#F97535] hover:bg-[#F97535]/90 text-white h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mt-7"
          >
            Start Detection
          </Link>
        </div>
        <img
          src="/images/landingimage.png"
          alt="recognition"
          className="h-[60vh] w-auto"
        />
      </div>
    </div>
  );
}
