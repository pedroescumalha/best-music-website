import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ESCUMALHA</title>
        <meta name="description" content="ESCUMALHA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-center pt-5">
        <nav className="w-11/12 bg-white px-6 py-3 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-4xl font-extrabold tracking-wide">Escumalha</h1>
          </div>
          <div className="text-end">
            <p>bio</p>
            <p>music</p>
            <p>contacts</p>
          </div>
        </nav>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
