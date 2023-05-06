import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { FaHeadphones } from 'react-icons/fa'

const Navbar = () => {
    const { data: session } = useSession();

    return (
        <div className="flex w-full justify-between items-center fixed top-0 left-0 px-3">
            <div>
                <Link href="/">
                    {/* <Image
                        src="/images/logo.png"
                        alt="moodify logo"
                        height={20}
                        width={20}
                        className="w-10 h-10"
                    /> */}
                    <p className="flex items-center tracking-widest">M<FaHeadphones className="text-blue-900" />ODIFY</p>
                </Link>
            </div>
            {session ? <button onClick={() => signOut()}>Signout {session.user.name}</button> : <Link href='/login'>Login</Link>}
        </div>
    )
}

export default Navbar