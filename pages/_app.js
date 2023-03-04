import "../styles/globals.css";
import { StateProvider } from "../store/StateProvider";
import reducer, { initalState } from "../store/reducer";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StateProvider initialState={initalState} reducer={reducer}>
        <Component {...pageProps} />
      </StateProvider>
    </>
  );
}

export default MyApp;
