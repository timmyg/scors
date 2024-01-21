import React from "react";
import { AppProps } from "next/app";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./global.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Scors</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Catamaran:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}

export default MyApp;