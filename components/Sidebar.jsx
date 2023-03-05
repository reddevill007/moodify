import { AiOutlineHome, AiOutlineFileSearch, AiOutlineHeart } from 'react-icons/ai'
import { RiGooglePlayLine } from 'react-icons/ri'
import { GiAerialSignal } from 'react-icons/gi'

const Sidebar = () => {
    return (
        <div className='text-gray-500 p-5 text-sm birder-r border-gray-900'>
            <div className='space-y-4'>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <AiOutlineHome className='h-5 w-5' />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <AiOutlineFileSearch className='h-5 w-5' />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RiGooglePlayLine className='h-5 w-5' />
                    <p>Your Library</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />

                <button className='flex items-center space-x-2 hover:text-white'>
                    <RiGooglePlayLine className='h-5 w-5' />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <AiOutlineHeart className='h-5 w-5' />
                    <p>Liked Songs</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <GiAerialSignal className='h-5 w-5' />
                    <p>Your Episodes</p>
                </button>
                <hr className='border-t-[0.1px] border-gray-900' />

                {/* Playlist */}
                <p className="cursor-pointer hover:text-white">
                    name...
                </p>
            </div>
        </div>
    )
}

export default Sidebar