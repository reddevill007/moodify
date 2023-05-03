import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";

import Navbar from "../components/Navigation/Navbar";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <RecoilRoot>
          <Head>
            <title>Moodify - Recognition</title>
            <meta
              name="description"
              content="Moodify is a web application that uses facial recognition to detect the user's mood and play a song that matches the mood."
            />
            <meta
              name="keywords"
              content="Moodify, Mood, Recognition, Facial, Face, Emotion, Emotions, Music, Spotify, Song, Songs, Playlist, Playlists, Moodify, Mood, Recognition, Facial, Face, Emotion, Emotions, Music, Spotify, Song, Songs, Playlist, Playlists, Moodify, Mood, Recognition, Facial, Face, Emotion, Emotions, Music, Spotify, Song, Songs, Playlist, Playlists, Moodify, Mood, Recognition, Facial, Face, Emotion, Emotions, Music, Spotify, Song, Songs, Playlist, Playlists, Moodify, Mood, Recognition, Facial, Face, Emotion, Emotions, Music, Spotify, Song, Songs, Playlist, Playlists, Moodify, Mood, Recognition, Facial, Face, Emotion, Emotions, Music, Spotify, Song, Songs, Playlist, Playlists"
            />
            <meta name="author" content="Moodify" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <link rel="icon" href="/images/logo.png" />
          </Head>
          <Navbar />
          <Component {...pageProps} />
        </RecoilRoot>
      </SessionProvider>
    </>
  );
}

export default MyApp;
