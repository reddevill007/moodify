import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { shuffle } from "lodash";

import { secondToMinuteAndSeconds } from "../../utils/time";
import axios from "axios";

export default function Dashboard() {
    const [mood, setMood] = useState("");
    const [fetchPlaylistId, setFetchPlaylistId] = useState(3645740262);
    const [playlist, setPlaylist] = useState([]);
    const router = useRouter();

    const sad = [
        '7354197464',
        '10814357062',
        '6090542704',
        '7618573602',
        '10883060842'
    ]

    const happy = [
        '1431548345',
        '8696658362',
        '5240613242'
    ]

    const noMood = [
        '3645740262'
    ]

    const selectPlaylistRandomly = () => {
        if (mood && mood === "happy") setFetchPlaylistId(shuffle(happy).pop());
        else if (mood === "sad") setFetchPlaylistId(shuffle(sad).pop());
        else setFetchPlaylistId(3645740262);
    }

    async function fetchSongs(playlistId) {
        const options = {
            method: "GET",
            url: `https://deezerdevs-deezer.p.rapidapi.com/playlist/${playlistId}`,
            headers: {
                "X-RapidAPI-Key": "902f469b5amshaddca6323fe5bd0p12d117jsn8c1c91f48b7b",
                "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setPlaylist(response.data)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (router.isReady) {
            const emotion = router.query.mood;
            setMood(emotion);
            selectPlaylistRandomly();
            fetchSongs(fetchPlaylistId);
        }
    }, [router.isReady]);

    return (
        <div className="relative container mx-auto flex items-center justify-center">
            {/* Head */}
            <Head>
                <title>Moodify - Result:{mood}</title>
            </Head>

            {/* Background */}
            <div>
                <h1>{playlist?.title}</h1>
                <p>{playlist?.description}</p>
                <p>{playlist?.fans}</p>
                <p>{secondToMinuteAndSeconds(playlist?.duration)}</p>
                <p>{playlist?.nb_tracks}</p>
                <Image
                    src={playlist?.picture_medium}
                    alt="Picture of the author"
                    width={500}
                    height={500}
                />

                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold text-center">
                        {mood === "happy" && "Happy"}
                        {mood === "sad" && "Sad"}
                        {mood === "noMood" && "No Mood"}
                    </h1>
                    <p className="text-xl text-center">
                        {mood === "happy" && "You are happy"}
                        {mood === "sad" && "You are sad"}
                        {mood === "noMood" && "You are not in a mood"}
                    </p>
                </div>

                <ul>
                    {playlist?.tracks?.data?.map((track) => (
                        <li key={track.id}>
                            <p>{track.title}</p>
                            <p>{track.artist.name}</p>
                            <p>{secondToMinuteAndSeconds(track.duration)}</p>
                            <Image

                                src={track.album.cover_medium}
                                alt="Picture of the author"
                                width={50}
                                height={50}
                            />
                            <audio src={track.preview} controls></audio>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);

    if (!session) {
        return {
            redirect: {
                destination: "/login",
            },
        };
    }

    return {
        props: { session },
    };
};
