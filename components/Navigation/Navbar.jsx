import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { FaHeadphones, FaSignOutAlt } from 'react-icons/fa'

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <div className="flex w-full justify-between items-center font-bold fixed top-0 left-0 px-3 shadow-lg py-2 bg-white">
            <div>
                <Link href="/">
                    <p className="flex items-center tracking-widest">M<FaHeadphones className="text-blue-900 px-1 w-5 h-5" />ODIFY</p>
                </Link>
            </div>
            {
                session
                    ?
                    <button className="flex justify-center items-center gap-2" onClick={() => signOut()}>
                        <FaSignOutAlt className="text-red-900" />
                        <div className="flex items-center justify-center gap-1 text-blue-800 font-bold">
                            <Image src={session.user.image} className="rounded-full" height={20} width={20} alt={session.user.email} />
                            {session.user.name}
                        </div>
                    </button>
                    :
                    <Link href='/login'>Login</Link>
            }
        </div>
    )
}

export default Navbar