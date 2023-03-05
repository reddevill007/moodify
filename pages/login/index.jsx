import { getProviders, signIn } from "next-auth/react"

const Login = ({ providers }) => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black">
            <h3 className="text-[20vh] text-white">MOODIFY</h3>
            {Object.values(providers).map(provider => (
                <button
                    className="bg-green-500 text-white py-2 px-8 rounded-full"
                    key={provider.name}
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                    Login with {provider.name}
                </button>
            ))}
        </div>
    )
}

export default Login

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}