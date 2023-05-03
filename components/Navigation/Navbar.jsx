import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"

const Navbar = () => {
    return (
        <div className="flex w-full justify-between items-center fixed top-0 left-0 px-3">
            <div>
                <Link href="/">
                    <Image
                        src="/images/logo.png"
                        alt="moodify logo"
                        height={20}
                        width={20}
                        className="w-10 h-10"
                    />
                </Link>
            </div>
            <button onClick={() => signOut()}>Signout</button>
        </div>
    )
}

export default Navbar