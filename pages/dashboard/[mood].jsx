import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { shuffle } from "lodash";
import { IoMdMusicalNotes, IoMdTime } from "react-icons/io";
import { secondToMinuteAndSeconds } from "../../utils/time";
import axios from "axios";
import Playlist from "../../components/Music/Playlist";
import { AiOutlineLike, AiOutlineLoading3Quarters } from "react-icons/ai";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

export default function Dashboard() {
    const [mood, setMood] = useState("");
    const [fetchPlaylistId, setFetchPlaylistId] = useState("3645740262");
    const [playlist, setPlaylist] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const router = useRouter();

    const sad = [
        '7354197464',
        '10814357062',
        '6090542704',
        '7618573602',
        '10883060842'
    ];

    const happy = [
        '1431548345',
        '8696658362',
        '5240613242'
    ];

    const selectPlaylistRandomly = () => {
        if (mood === "happy") {
            setFetchPlaylistId(shuffle(happy).pop());
        } else if (mood === "sad") {
            setFetchPlaylistId(shuffle(sad).pop());
        } else {
            setFetchPlaylistId("3645740262"); // Default playlist
        }
    };

    const fetchSongs = async (playlistId) => {
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
            setPlaylist(response.data);
            console.log(response.data);
            setCurrentIndex(0);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (router.isReady) {
            const emotion = router.query.mood;
            setMood(emotion);
        }
    }, [router.isReady]);

    // Trigger playlist selection when mood is set
    useEffect(() => {
        if (mood) {
            selectPlaylistRandomly();
        }
    }, [mood]);

    // Fetch playlist when the playlist ID changes
    useEffect(() => {
        if (fetchPlaylistId) {
            fetchSongs(fetchPlaylistId);
        }
    }, [fetchPlaylistId]);

    const handlePlayPause = (index) => {
        if (currentIndex === index && isPlaying) {
            // Pause if the current song is playing
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            // Play the selected song or resume if paused
            setCurrentIndex(index);
            setIsPlaying(true);
        }
    };

    const handleNext = () => {
        if (currentIndex !== null) {
            const nextIndex = (currentIndex + 1) % playlist?.tracks?.data.length;
            setCurrentIndex(nextIndex);
            setIsPlaying(true);
        }
    };

    const handlePrevious = () => {
        if (currentIndex !== null) {
            const prevIndex = (currentIndex - 1 + playlist?.tracks?.data.length) % playlist?.tracks?.data.length;
            setCurrentIndex(prevIndex);
            setIsPlaying(true);
        }
    };

    useEffect(() => {
        // Play the current song when index changes
        if (currentIndex !== null && audioRef.current) {
            if (isPlaying) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [currentIndex, isPlaying]);

    // Update progress based on the audio time
    useEffect(() => {
        const updateProgress = () => {
            if (audioRef.current && currentIndex !== null) {
                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
            }
        };

        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.addEventListener('timeupdate', updateProgress);
            return () => audioElement.removeEventListener('timeupdate', updateProgress);
        }
    }, [currentIndex]);

    return (
        <div className="flex items-center justify-center mx-auto">
            {/* Head */}
            <Head>
                <title>Moodify - Result: {mood}</title>
            </Head>

            {playlist === null && <div className="flex items-center justify-center w-full h-screen">
                <AiOutlineLoading3Quarters className="animate-spin" />
            </div>}

            {/* Background */}
            <div className="container flex flex-col items-center justify-center gap-5 pt-20 mx-auto text-white">
                {playlist ? <div className="flex flex-col items-center justify-center w-full gap-2 p-5 md:w-3/4 md:flex-row">
                    <img
                        src={playlist?.picture_medium}
                        alt="Picture of the author"
                        className="w-[400px] rounded aspect-square"
                    />
                    <div className="flex flex-col gap-2">
                        <h1 className="mb-4 text-4xl">{playlist?.title}</h1>
                        <p className="">
                            {mood === "happy" && "You are happy"}
                            {mood === "sad" && "You are sad"}
                            {mood === "noMood" && "You are not in a mood"}
                        </p>
                        <div className="flex gap-2">
                            <p className="flex items-center gap-2"><AiOutlineLike /> {playlist?.fans} Likes</p>
                            <p className="flex items-center gap-2"><IoMdTime /> {secondToMinuteAndSeconds(playlist?.duration)} min</p>
                            <p className="flex items-center gap-2"><IoMdMusicalNotes /> {playlist?.nb_tracks} songs</p>
                        </div>
                        <div className="flex flex-col items-center p-4 text-white bg-[#15171C] rounded">
                            <div className="flex items-center justify-between w-full mb-2">
                                <button onClick={handlePrevious} className="px-4 py-2 text-white">
                                    <GrFormPrevious className="w-10 h-10" color="#ffffff" />
                                </button>
                                <div className="flex flex-col items-center">
                                    <p>{playlist?.tracks?.data[currentIndex]?.title}</p>
                                    <p className="text-sm text-gray-400">{playlist?.tracks?.data[currentIndex]?.artist.name}</p>
                                </div>
                                <button onClick={handleNext} className="px-4 py-2 text-white">
                                    <GrFormNext className="w-10 h-10" color="#ffffff" />
                                </button>
                            </div>

                            <div className="flex items-center w-full mb-2">
                                <button onClick={() => handlePlayPause(currentIndex)} className="px-4 py-2">
                                    {isPlaying ? (
                                        <CiPause1 />

                                    ) : (
                                        <CiPlay1 />
                                    )}
                                </button>

                                {/* Progress Bar */}
                                <div className="flex-grow h-1 mx-4 overflow-hidden bg-gray-600 rounded">
                                    <div
                                        className="h-full bg-[#F97535]"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <span className="text-sm">
                                    {secondToMinuteAndSeconds(audioRef.current?.currentTime || 0)} / {secondToMinuteAndSeconds(playlist?.tracks?.data[currentIndex]?.duration)}
                                </span>
                            </div>

                            {/* Audio Player */}
                            <audio
                                ref={audioRef}
                                src={playlist?.tracks?.data[currentIndex]?.preview}
                                autoPlay
                                onEnded={handleNext}
                            />
                        </div>
                    </div>
                </div> : <div className="flex items-center justify-center w-full h-screen">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>}
                <div className="w-3/4">
                    <Playlist playlists={playlist?.tracks?.data} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
                </div>
            </div>
        </div>
    );
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
