import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { FaAngleRight, FaHeadphones, FaSignOutAlt } from 'react-icons/fa'

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <div className="w-full fixed top-0 left-0 shadow-lg py-4 bg-[#15171C] text-white">
            <div className="container flex items-center justify-between mx-auto">
                <div>
                    <Link href="/">
                        <p className="flex items-center font-bold tracking-widest">M<FaHeadphones className="w-6 h-6 px-[2px] text-[#F97535]" />ODIFY</p>
                    </Link>
                </div>
                {
                    session
                        ?
                        <button className="flex items-center justify-center gap-2" onClick={() => signOut()}>
                            <div className="flex items-center justify-center gap-1 font-bold text-white">
                                <Image src={session.user.image} className="rounded-full" height={30} width={30} alt={session.user.email} />
                                {session.user.name}
                            </div>
                            <FaAngleRight className="text-[#F97535] h-[20px] w-[20px]" />
                        </button>
                        :
                        <Link href='/login'>Login</Link>
                }
            </div>
        </div>
    )
}

export default Navbar