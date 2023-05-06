import React from "react";
import { useSession, signIn, getProviders, getSession } from "next-auth/react";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/router";

const Login = ({ providers }) => {
  const { data: session } = useSession();

  return (
    <div className="cotainer h-screen mx-auto flex flex-col justify-center items-center">
      <Head>
        <title>Moodify - Login</title>
      </Head>
      <h1 className="text-blue-800 font-bold text-2xl md:text-4xl text-center mb-4">
        Login
      </h1>
      <p className="text-blue-300 max-w-[100ch] text-center mx-auto">
        Transform Your Listening Experience with Moodifys Mood-Based Music
        Selection
      </p>
      <Image
        className="h-[300px] w-[300px] object-cover"
        src="/images/login.png"
        height={20}
        width={20}
        alt="Login"
      />

      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="border px-4 py-3 rounded text-[#fff] font-bold bg-gradient-to-tr from-blue-400 to-blue-600"
            onClick={() => signIn(provider.id)}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
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
