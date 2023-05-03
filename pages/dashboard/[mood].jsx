import { shuffle } from "lodash";
import Head from "next/head";
import { useRouter } from "next/router"
import { useEffect, useState, useRef } from "react";
import { BsPauseFill, BsPlayFill } from 'react-icons/bs'

import { secondToMinuteAndSeconds } from "../../utils/time";
import Image from "next/image";

export default function Dashboard() {
    const [mood, setMood] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [track, setTrack] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchPlaylistId, setFetchPlaylistId] = useState(null);
    const [artist, setArtist] = useState([]);
    const [playing, setPlaying] = useState(false)
    const router = useRouter();
    const audioRef = useRef(null);

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

    const fetchData = () => {
        console.log(fetchPlaylistId)
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '43d05354d2msh638a6e3c5df4ab5p1f6609jsn44fdbd5a82ea',
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        };

        fetch(`https://deezerdevs-deezer.p.rapidapi.com/playlist/${fetchPlaylistId}`, options)
            .then(response => response.json())
            .then(response => setPlaylist(response))
            .catch(err => console.error(err));
    }

    const setPlaylistAccordingToMood = () => {
        if (mood && mood === "happy") setFetchPlaylistId(shuffle(happy).pop());
        else if (mood === "sad") setFetchPlaylistId(shuffle(sad).pop());
        else setFetchPlaylistId(shuffle(noMood).pop());
    }

    const fetchArtist = () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '43d05354d2msh638a6e3c5df4ab5p1f6609jsn44fdbd5a82ea',
                'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
            }
        };

        fetch('https://genius-song-lyrics1.p.rapidapi.com/artist/leaderboard/?id=344497&per_page=20&page=1', options)
            .then(response => response.json())
            .then(response => setArtist(response.leaderboard))
            .catch(err => console.error(err));
    }

    const togglePlay = () => setPlaying(!playing);

    useEffect(() => {
        if (audioRef && audioRef.current) {
            if (playing) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [playing])

    useEffect(() => {

        if (router.isReady) {
            setIsLoading(true);
            const emotion = router.query.mood;
            setMood(emotion);
            setPlaylistAccordingToMood();
            fetchData();
            fetchArtist();
            setIsLoading(false);
        }
    }, [router.isReady]);

    return (
        <div className="relative container mx-auto flex items-center justify-center">
            {/* Head */}
            <Head>
                <title>Moodify - Result:{mood}</title>
            </Head>
            {/* Center */}
            <div className="text-blue-800 w-full p-4">
                {isLoading && <h1 className="text-white">Loading...</h1>}
                {/* Banner */}
                <div className="w-full h-[300px] mx-auto mb-10 rounded-xl relative">
                    <img src={playlist.picture_big} alt="" className="mb-10 h-full w-full object-cover absolute top-0 left-0 rounded-xl" />
                    <div className="absolute z-20 top-0 left-0 w-full h-full rounded-xl bg-black bg-opacity-60">
                        <h3 className="text-3xl text-white p-2">{playlist.title}</h3>
                    </div>
                </div>

                {/* Playlist */}
                <div className="space-y-3 pb-40">
                    {playlist?.tracks?.data.slice(0, 10).map((play, i) => {
                        return (
                            <div key={play.id} onClick={() => { setTrack(i); setPlaying(false) }} className={`flex gap-10 border-b border-blue-900 cursor-pointer hover:bg-blue-900 rounded-lg items-center p-4 ${i === track && 'bg-blue-900'}`}>
                                <img className="h-10 w-10 rounded-full" src={play.album.cover_big} alt="" />
                                <div className="flex flex-1 items-center justify-between">
                                    <p className="text-blue-300 w-1/3">{play.title}</p>
                                    <p className="text-blue-300 w-1/3 text-center">{secondToMinuteAndSeconds(play.duration)}</p>
                                    <p className="text-blue-300 w-1/3 text-right">{play.artist.name}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Aside */}
            <div className="flex-grow p-4 h-screen flex flex-col justify-between overflow-scroll scrollbar-hide">
                <div className="">
                    {/* Artists */}
                    {/* <div className="flex w-full flex-col gap-2">
                    {artist.slice(0, 5).map((art) => (
                        <div key={art?.id} className="flex w-[300px] gap-2 text-white">
                            <img className="h-10 w-10 rounded-lg object-cover" src={art?.user?.header_image_url} alt="" />
                            <p>{art?.user?.name}</p>
                        </div>
                    ))}
                </div> */}
                </div>
            </div>

            {/* Player */}
            <div className="bg-blue-900 bg-opacity-90 p-5 fixed bottom-0 left-1/2 -translate-x-1/2 container text-white">
                <div>
                    <p>{secondToMinuteAndSeconds(audioRef?.current?.duration)}</p>
                </div>
                {playlist?.tracks?.data.slice(0, 10).map((play, i) => {
                    if (i === track) {
                        return (
                            <div key={play.id} className="w-full flex justify-between items-center px-10">
                                <Image
                                    height={20}
                                    width={20}
                                    className="h-14 w-14 rounded-full"
                                    src={play.album.cover_big}
                                    alt={play.artist.name} />
                                <p>{play.title}</p>
                                <p className="text-white">{play.artist.name}</p>
                                <audio src={play.preview} ref={audioRef} />
                                <div className="w-8 h-8 bg-blue-900 flex justify-center items-center cursor-pointer rounded-full" onClick={togglePlay}>{playing ? <BsPauseFill className="h-6 w-6" /> : <BsPlayFill className="h-6 w-6" />}</div>

                            </div>
                        )
                    }
                })}
            </div>
        </div>

    )
}
