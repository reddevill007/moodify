import React from 'react'

const Login = () => {
    const handleLogin = () => {
        const clientID = "153127607bd74ab0abd0ff29cdc410db"
        const redirectUrl = "http://localhost:3000/"
        const apiUrl = "https://accounts.spotify.com/authorize"
        const scope = [
            'user-read-email',
            'user-read-private',
            'user-read-playback-state',
            'user-modify-playback-state',
            'user-read-currently-playing',
            'user-read-playback-position',
            'user-top-read',
            'user-read-recently-played'
        ];

        window.location.href = `${apiUrl}?client_id=${clientID}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_dialog=true`
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen w-full bg-green-500 gap-10'>
            {/* Logo */}
            <div className='text-[20vh]'>MOODIFY</div>
            <button onClick={handleLogin} className='rounded-2xl text-green-500 bg-black text-xl px-8 py-3'>Connect Spotify</button>
        </div>
    )
}

export default Login