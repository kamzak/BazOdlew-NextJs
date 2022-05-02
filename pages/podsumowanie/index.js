import React, { useRef } from 'react';
import { Fragment } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
const Podsumowanie = dynamic(()=>import("../../components/Podsumowanie/Podsumowanie"),{ssr:false});

function PodsumowaniePage() {
  const ref = useRef();
  return (
    <Fragment>
      <Head>
        <title>BazOdlew - Podsumowanie</title>
        <meta
          name="description"
          content="Wszystkie wyniki dla danego wytopu w jednym miejscu"
        />
      </Head>
      <h1 style={{ textAlign: 'center'}}>Podsumowanie wyników</h1>
      <Podsumowanie html={ref} />
    </Fragment>
  );
}

export default PodsumowaniePage;
