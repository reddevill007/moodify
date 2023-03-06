import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [mood, setMood] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [tracks, setTracks] = useState([])
    const router = useRouter();

    const fetchData = () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '43d05354d2msh638a6e3c5df4ab5p1f6609jsn44fdbd5a82ea',
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        };

        fetch('https://deezerdevs-deezer.p.rapidapi.com/playlist/6090542704', options)
            .then(response => response.json())
            .then(response => setPlaylist(response))
            .catch(err => console.error(err));

        // setTracks(playlist.tracks.data)
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        if (router.isReady) {
            const emotion = router.query.mood;
            setMood(emotion);
        }
    }, [router.isReady]);

    return (
        <div className="bg-black min-h-screen text-white">
            <img src={playlist.picture_big} alt="" />
            {playlist?.tracks?.data?.slice(0, 10).map(play => {
                return (
                    <div key={play.id}>
                        <img className="h-10 w-10 rounded-full" src={play.album.cover_big} alt="" />
                        <p>{play.title}</p>
                        <audio src={play.preview} controls />
                    </div>
                )
            })}
        </div>
    )
}
