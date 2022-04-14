import React from 'react';
import { Fragment, useState } from "react";
import Head from "next/head";
import Analiza from '../../components/Analiza/Analiza';

function AnalizaPage() {
  return (
    <Fragment>
      <Head>
        <title>BazOdlew - Analiza chemiczna</title>
        <meta
          name="description"
          content="Podstrona do zarządzania analizą chemiczną"
        />
      </Head>
      <h1>Analiza chemiczna</h1>
      <Analiza />
    </Fragment>
  );
}

export default AnalizaPage;
