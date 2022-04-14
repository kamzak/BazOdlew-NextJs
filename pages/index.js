import Head from "next/head";
import HomePage from '../components/HomePage/HomePage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>BazOdlew</title>
        <meta
          name="description"
          content="System bazodanowy do archiwizacji badań w odlewnictwie"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </div>
  );
}
