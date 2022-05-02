import React from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Mech from '../../components/Mech/Mech';

function MechPage() {
  return (
    <Fragment>
      <Head>
        <title>BazOdlew - Właściwości mechaniczne</title>
        <meta
          name="description"
          content="Podstrona do zarządzania wynikami badań właściwości mechanicznych"
        />
      </Head>
      <h1>Właściwości mechaniczne</h1>
      <Mech />
    </Fragment>
  );
}

export default MechPage;
