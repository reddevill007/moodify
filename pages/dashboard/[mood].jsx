import { useRouter } from "next/router"
import { useEffect, useState } from "react";

export default function Dashboard() {
    const [mood, setMood] = useState("");
    const [playlist, setPlaylist] = useState([]);
    const [track, setTrack] = useState(1)
    const router = useRouter();

    const fetchData = () => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '43d05354d2msh638a6e3c5df4ab5p1f6609jsn44fdbd5a82ea',
                'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
            }
        };

        fetch('https://deezerdevs-deezer.p.rapidapi.com/playlist/7618573602', options)
            .then(response => response.json())
            .then(response => setPlaylist(response))
            .catch(err => console.error(err));
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
            <img src={playlist.picture_big} alt="" className="mb-10" />
            <div className="space-y-3 pb-40">
                {playlist?.tracks?.data.slice(0, 16).map((play, i) => {
                    return (
                        <div key={play.id} onClick={() => setTrack(i)} className='flex gap-10 border-b border-gray-900 cursor-pointer hover:bg-gray-900 rounded-lg items-center space-y-2 pb-4'>
                            <img className="h-10 w-10 rounded-full" src={play.album.cover_big} alt="" />
                            <p>{play.title}</p>
                        </div>
                    )
                })}
            </div>

            <div className="fixed bottom-0 right-0 w-full bg-red-500">
                {playlist?.tracks?.data.map((play, i) => {
                    if (i === track) {
                        return (
                            <div key={play.id} className="w-full flex justify-between items-center px-10">
                                <img className="h-10 w-10 rounded-full" src={play.album.cover_big} alt="" />
                                <audio src={play.preview} controls className="bg-transparent" />
                                <p>{play.title}</p>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}
