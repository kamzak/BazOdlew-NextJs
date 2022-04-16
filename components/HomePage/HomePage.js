function HomePage() {
  return (
    <main>
      <h1>Aktualizacje</h1>
      <ul>
        <li>Logowanie oraz rejestracja poprzez Firebase Authentication</li>
        <li>
          Przechowywanie i odczytywanie danych REST API - Firebase Realtime
          Database
        </li>
        <li>Przechowywanie i odczytywanie zdjęć - Firebase Storage</li>
        <li>Formularze z pełną walidacją: </li>
        <ul>
          <li>
            Nr wytopu może mieć maksymalnie 6 znaków, przy czym po opuszczeniu
            pola, sprawdzane jest czy dany nr istnieje już w bazie i wyświetlany
            jest odpowiedni komunikat
          </li>
          <li>
            Dla wartości procentowych możliwe jest wpisanie jedynie liczb z
            zakresu 0 - 100, do 7 znaków (kilka cyfr po przecinku)
          </li>
          <li>
            Po uzupełnieniu wszystkich pól możliwe jest przesłanie formularza
          </li>
        </ul>
        <li>Komunikaty po dodaniu/usunięciu wyników</li>
        <li>
          W zakładce Podsumowanie, wyniki zebrane z trzech tabel wraz z
          możliwością wygenerowania PDF
        </li>
      </ul>
    </main>
  );
}

export default HomePage;
