import React from 'react';
import { Fragment } from "react";
import Head from "next/head";
import Register from '../../components/Register/Register';

function AnalizaPage() {
  return (
    <Fragment>
      <Head>
        <title>BazOdlew - Rejestracja</title>
        <meta
          name="description"
          content="Zarejestruj się aby mieć dostęp do wszystkich funkcjonalności strony."
        />
      </Head>
      <h1 style={{ textAlign: 'center'}}>Uzupełnij dane</h1>
      <Register />
    </Fragment>
  );
}

export default AnalizaPage;
