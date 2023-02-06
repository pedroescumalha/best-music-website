import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { FC } from "react";
import Image from "next/image";

const NavBar: FC = () => {
  return (
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
  );
};

const Footer: FC = () => {
  const iconSize = 20;
  
  return (
    <footer className="fixed inset-x-0 bottom-0 flex justify-center px-6 py-3 flex items-center justify-center gap-4 shadow-sm">
      <Image
        alt="spotify"
        src="/spotify.png"
        width={iconSize}
        height={iconSize}
      />
      <Image
        alt="instagram"
        src="/instagram.png"
        width={iconSize}
        height={iconSize}
      />
      <Image
        alt="bandcamp"
        src="/bandcamp.png"
        width={iconSize}
        height={iconSize}
      />
      <Image
        alt="mail"
        src="/mail.png"
        width={iconSize}
        height={iconSize}
      />      
    </footer>  
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ESCUMALHA</title>
        <meta name="description" content="ESCUMALHA" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
