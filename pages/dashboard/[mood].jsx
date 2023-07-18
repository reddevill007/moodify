import { useEffect, useState } from "react";
import { useRouter } from "next/router"
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import _, { shuffle } from "lodash";

import { secondToMinuteAndSeconds } from "../../utils/time";
import axios from "axios";
import Playlist from "../../components/Music/Playlist";

export default function Dashboard() {
    const [mood, setMood] = useState("");
    const [fetchPlaylistId, setFetchPlaylistId] = useState("3645740262");
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

    const selectPlaylistRandomly = () => {
        console.log("called")
        if (mood === "happy") setFetchPlaylistId(shuffle(happy).pop());
        // if (mood === "happy") setFetchPlaylistId(_.sample(happy));
        else if (mood === "sad") setFetchPlaylistId(shuffle(sad).pop());
        // else setFetchPlaylistId(3645740262);
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
        <div className="mx-auto flex items-center justify-center">
            {/* Head */}
            <Head>
                <title>Moodify - Result:{mood}</title>
            </Head>

            {playlist === [] && <div className="bg-red-900">loading...</div>}

            {/* Background */}
            <div className="mt-10 w-full">

                <div className="flex flex-col items-center justify-center">
                    <p className="text-xl text-center">
                        {mood === "happy" && "You are happy"}
                        {mood === "sad" && "You are sad"}
                        {mood === "noMood" && "You are not in a mood"}
                    </p>
                </div>
                <div className="min-h-screen p-5 w-full bg-slate-200 flex flex-col justify-between items-center">
                    <h1 className="text-4xl">{playlist?.title}</h1>
                    <p>{playlist?.description}</p>
                    <p>{playlist?.fans} Likes</p>
                    <p>{secondToMinuteAndSeconds(playlist?.duration)} min</p>
                    <p>{playlist?.nb_tracks} songs</p>
                    <Image
                        src={playlist?.picture_medium}
                        alt="Picture of the author"
                        className="rounded-full"
                        width={500}
                        height={500}
                    />
                </div>

                <Playlist playlists={playlist?.tracks?.data} />
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
