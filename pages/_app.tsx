import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../src/store";
import { Provider } from "react-redux";
import React from "react";

export default function App({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    
    store.subscribe(() => {
      const token = store.getState().firebaseSlice.token;
      if (token) {
        window.localStorage.setItem("accessToken", token);
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
