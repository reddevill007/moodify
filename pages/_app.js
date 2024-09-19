import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { useRouter } from "next/router"; // Import useRouter hook

import Navbar from "../components/Navigation/Navbar";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter(); // Initialize router

  return (
    <>
      <SessionProvider session={session}>
        <RecoilRoot>
          <NextTopLoader
            color="#2299DD"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #2299DD,0 0 5px #2299DD"
          />
          <Head>
            <title>Moodify - Recognition</title>
            <meta
              name="description"
              content="Moodify is a web application that uses facial recognition to detect the user's mood and play a song that matches the mood."
            />
            <meta
              name="keywords"
              content="Moodify, Mood, Recognition, Facial, Face, Emotion, Emotions, Music, Spotify, Song, Songs, Playlist, Playlists, Moodify, Mood, Recognition, Facial, Face, Emotion, Emotions, Music, Spotify, Song, Songs, Playlist, Playlists, Moodify, Mood, Recognition, Facial, Face, Emotion, Emotions, Music, Spotify, Song, Songs, Playlist, Playlists, Moodify, Mood, Recognition, Facial, Face, Emotion, Emotions, Music, Spotify, Song, Songs, Playlist, Playlists"
            />
            <meta name="saurabh pandey" content="Moodify" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="icon" href="/images/logo.png" />
          </Head>
          {/* Conditionally render the Navbar based on the current route */}
          {router.pathname !== "/login" && <Navbar />}
          <main className="bg-[#101114]">
            <Component {...pageProps} />
          </main>
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}

export default MyApp;
