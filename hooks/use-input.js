import { useState } from "react";

const useInput = (
  validateValue,
  maxLength,
  canBeNegative = true,
  maxHundret = false
) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event) => {
    if (event.target.value.length <= maxLength) { /* weryfikacja czy liczba znaków wprowadzonych do pola jest mniejsza niż ta zadana w argumencie maxLength */
      if (canBeNegative) { /* jeśli canBeNegative = true (wartość może być ujemna), wtedy przypisz wartość z pola do zmiennej enteredValue */
        setEnteredValue(event.target.value);
      }
      if (!canBeNegative) { /* jeśli canBeNegative = false (wartość nie może być ujemna*/ 
        if (maxHundret && !canBeNegative) {/* jeśli maxHundret = true i canBeNegative = false */
          if (event.target.value >= 0 && event.target.value <= 100) { /* jeśli wartość z pola jest w zakresie
           0 - 100 przypisz ją do zmiennej enteredValue*/
            setEnteredValue(event.target.value);
          }
        } else if (event.target.value >= 0) { /* jeśli wartość wpisana w pole jest większa lub równa 0 przypisz wartość do zmiennej enteredValue */
          setEnteredValue(event.target.value);
        }
      }
    } /* zmiana isTouched na true, pole zostało kliknięte */
    setIsTouched(true);
  };

  const inputBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = (value = "") => {
    setEnteredValue(value);
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    setEnteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;