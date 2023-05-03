import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <h1>Logged in as {session.user.email}</h1>
        <button className="border p-2 " onClick={() => signOut()}>
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Login</h1>
        <button className="border p-2 " onClick={() => signIn()}>
          Sign in
        </button>
      </div>
    );
  }
};

export default Login;
