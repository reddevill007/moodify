import { signOut } from "next-auth/react"

const Navbar = () => {
    return (
        <div className="flex w-full justify-between items-center fixed top-0 left-0 px-3">
            <div>Logo</div>
            <button onClick={() => signOut()}>Signout</button>
        </div>
    )
}

export default Navbar