import React from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Analiza from '../../components/Analiza/Analiza';

function AnalizaPage() {
  return (
    <Fragment>
      <Head>
        <title>BazOdlew - Analiza składu chemicznego</title>
        <meta
          name="description"
          content="Podstrona do zarządzania analizą składu chemicznego"
        />
      </Head>
      <h1>Analiza składu chemicznego</h1>
      <Analiza />
    </Fragment>
  );
}

export default AnalizaPage;
