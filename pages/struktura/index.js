import React from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Struktura from '../../components/Struktura/Struktura';

function StrukturaPage() {
  return (
    <Fragment>
      <Head>
        <title>BazOdlew - Struktura</title>
        <meta
          name="description"
          content="Podstrona do zarządzania wynikami badań struktury"
        />
      </Head>
      <h1>Struktura</h1>
      <Struktura />
    </Fragment>
  );
}

export default StrukturaPage;
