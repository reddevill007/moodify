import Link from "next/link";
import React from "react";
import { useSession, signIn, getProviders, getSession } from "next-auth/react";
import Head from "next/head";

const Login = ({ providers }) => {
  const { data: session } = useSession();
  return (
    <div className="flex flex-wrap">
      <Head>
        <title>Moodify - Login</title>
      </Head>
      <div className="flex flex-col w-full md:w-1/2">
        <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <Link
            href="/"
            className="pb-2 text-2xl font-bold text-white border-b-4 border-b-[#F97535]"
          >
            Moodify
          </Link>
        </div>
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          <p className="mt-2 text-center text-gray-500">
            Welcome back, please login to continue.
          </p>
          {Object.values(providers).map((provider) => (
            <button
              className="flex items-center justify-center px-4 py-2 mt-8 text-white transition border rounded-md outline-none -2 ring-white ring-offset-2 focus:ring-2 hover:text-gray-500 hover:ring-gray-500"
              onClick={() => signIn(provider.id)}
              key={provider.name}
            >
              <img
                className="h-5 mr-2"
                src="https://static.cdnlogo.com/logos/g/35/google-icon.svg"
                alt="Google icon"
              />
              Log in with {provider.name}
            </button>
          ))}
          <div className="flex items-center justify-center mt-10">
            <p className="text-gray-600 whitespace-nowrap">
              Transform Your Listening Experience with Moodifys Mood-Based Music
              Selection
            </p>
          </div>
        </div>
      </div>
      <div className="relative hidden h-screen bg-black pointer-events-none select-none md:block md:w-1/2">
        <img
          className="absolute top-0 object-cover w-full h-full -z-1 opacity-90"
          src="/images/loginimage.jpeg"
          alt="Background"
        />
      </div>
    </div>
  );
};

export default Login;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
