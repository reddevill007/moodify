import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { secondToMinuteAndSeconds } from '../../utils/time';
import { CiPause1, CiPlay1 } from 'react-icons/ci';

const Playlist = ({
    playlists,
    currentIndex,
    setCurrentIndex,
    isPlaying,
    setIsPlaying
}) => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            {/* Playlist UI */}
            <div className="flex flex-wrap items-center justify-around gap-5">
                {playlists?.map((track, index) => (
                    <div
                        key={index}
                        className={`flex flex-col p-4 rounded-lg border ${currentIndex === index ? 'border-[#F97535] shadow-lg shadow-[#F97535]' : ''
                            }`}
                    >
                        <img
                            src={track.album.cover_medium}
                            alt={track.title}
                            className="object-cover w-[200px] h-[200px] rounded-lg"
                        />
                        <div className="flex-grow">
                            <p className="text-sm font-semibold">
                                {track.title.length > 20 ? `${track.title.slice(0, 20)}...` : track.title}
                            </p>
                            <p className="text-gray-500">{track.artist.name}</p>
                        </div>
                        <div className="flex items-center">
                            <button className="mr-2" onClick={() => {
                                setCurrentIndex(index);
                                if (currentIndex === index && isPlaying) setIsPlaying(!isPlaying)
                                else setIsPlaying(true)
                            }}>
                                {currentIndex === index && isPlaying ? (
                                    <CiPause1 />
                                ) : (
                                    <CiPlay1 />
                                )}
                            </button>
                            <div className="text-gray-500">{secondToMinuteAndSeconds(track.duration)}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Player UI */}
        </div>
    );
};

export default Playlist;
