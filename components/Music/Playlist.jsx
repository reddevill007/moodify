import Image from 'next/image';
import React, { useState } from 'react';
import { secondToMinuteAndSeconds } from '../../utils/time';

const Playlist = ({ playlists }) => {
    const [currentSong, setCurrentSong] = useState(null);

    const handlePlayPause = (song) => {
        if (currentSong === song) {
            // Pause the current song
            setCurrentSong(null);
        } else {
            // Play a new song
            setCurrentSong(song);
        }
    };

    return (
        <div className="flex flex-col">
            {playlists?.slice(0, 15).map((track, index) => (
                <div
                    key={index}
                    className="flex items-center p-4 border-b border-gray-200"
                >
                    <div className="w-16 h-16 mr-4">
                        <Image
                            src={track.album.cover_medium}
                            alt="Picture of the author"
                            width={50}
                            height={50}
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>
                    <div className="flex-grow">
                        <p className="text-lg font-semibold">{track.title}</p>
                        <p className="text-gray-500">{track.artist.name}</p>
                    </div>
                    <div className="flex items-center">
                        <button className="mr-2" onClick={() => handlePlayPause(track)}>
                            {currentSong === track ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-6 h-6"
                                >
                                    <path d="M5 4L15 12L5 20z" />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-6 h-6"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                        <div className="text-gray-500">{secondToMinuteAndSeconds(track.duration)}</div>
                    </div>
                </div>
            ))}
            {currentSong && (
                <audio
                    src={currentSong.preview}
                    autoPlay
                    onEnded={() => setCurrentSong(null)}
                />
            )}
        </div>
    );
};

export default Playlist;
