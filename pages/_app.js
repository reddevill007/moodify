import "../styles/globals.css";
import { RecoilRoot } from "recoil";

import Navbar from "../components/Navigation/Navbar";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <RecoilRoot>
        <Navbar />
        <Component {...pageProps} />
      </RecoilRoot>
    </>
  );
}

export default MyApp;
