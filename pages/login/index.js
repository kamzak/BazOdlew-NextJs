import React from 'react';
import { Fragment } from "react";
import Head from "next/head";
import  Login from '../../components/Login/Login';

function AnalizaPage() {
  return (
    <Fragment>
      <Head>
        <title>BazOdlew - Logowanie</title>
        <meta
          name="description"
          content="Zaloguj się aby mieć dostęp do wszystkich funkcjonalności strony."
        />
      </Head>
      <h1 style={{ textAlign: 'center'}}>Uzupełnij dane logowania</h1>
      <Login />
    </Fragment>
  );
}

export default AnalizaPage;
