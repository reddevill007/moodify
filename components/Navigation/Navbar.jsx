import { AiOutlineHome, AiOutlineSearch } from 'react-icons/ai'
import { CiMusicNote1 } from 'react-icons/ci'
import { FaUserAlt } from 'react-icons/fa'
import { BsRobot } from 'react-icons/bs'

const Navbar = () => {
    return (
        <div className='fixed p-3 top-0 left-0 h-screen w-[68px] bg-gray-800 flex flex-col justify-between py-4 items-center'>
            <div className='flex flex-col gap-10 '>
                <div className='h-full flex items-center justify-center flex-col gap-1 text-white'>
                    <AiOutlineHome className='h-6 w-6' />
                    <p className='text-xs text-white'>Home</p>
                </div>
                <div className='h-full flex items-center justify-center flex-col gap-1 text-white'>
                    <FaUserAlt />
                    <p className='text-xs text-white'>About</p>
                </div>
                <div className='h-full flex items-center justify-center flex-col gap-1 text-white'>
                    <BsRobot />
                    <p className='text-xs text-white'>Detection</p>
                </div>
                <div className='h-full flex items-center justify-center flex-col gap-1 text-white'>
                    <AiOutlineSearch />
                    <p className='text-xs text-white'>Search</p>
                </div>
                <div className='h-full flex items-center justify-center flex-col gap-1 text-white'>
                    <CiMusicNote1 />
                    <p className='text-xs text-white'>Music</p>
                </div>
            </div>
            <div className='text-white'>
                Logo
            </div>
        </div>
    )
}

export default Navbar