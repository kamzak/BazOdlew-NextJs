import { useState, useRef } from "react";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from 'next/router'

import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import classes from "./Register.module.css";
import Link from "next/link";

import Modal from "../Modals/Modal";
import successIcon from '../static/success.png';

function Register() {
  const { user, signUp } = useAuth();
  const [error, setError] = useState(null);

  const [showAddAlert, setAddShowAlert] = useState(false);

  const router = useRouter();

  const showAlert = () => {
    setAddShowAlert(prevState => !prevState);
  }

  const [values, setValues] = useState({
    login: "",
    password: "",
    showPassword: false,
  });

  const emailRef = useRef();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const signUpHandler = async (event) => {
    event.preventDefault();
    try {
      setError(null);
      await signUp(values.login, values.password);
      setAddShowAlert(true);
      setTimeout(() => setAddShowAlert(false), 5000);
      setTimeout(() => router.push('/login'), 3000);

    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className={classes.container}>
      <TextField
        label="E-mail"
        id="outlined-end-adornment"
        ref={emailRef}
        onChange={handleChange("login")}
        sx={{ m: 1, width: "25ch", bgcolor: 'white' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AccountCircle sx={{ ml: 0.25, mr: -0.5 }} />
            </InputAdornment>
          ),
        }}
      />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          sx={{ bgcolor: 'white' }}
          onKeyPress={(event) => {
            if (event.key === 'Enter')
              signUpHandler(event);
          }}
          endAdornment={
            <InputAdornment position="end" >
              <IconButton
                sx={{ ml: -0.75 }}
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      {error !== null && <span className={classes.error}>Wprowadzono nieprawidłowe dane!</span>}
      <Button
        onClick={signUpHandler}
        className={classes.sendButton}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Zarejestruj się
      </Button>
      <div className={classes.registerButton}>
        <Link href="/login">Zaloguj się</Link>
      </div>
      {showAddAlert && error === null && (
        <Modal src={successIcon} onClose={showAlert}>
          Utworzono konto! Możesz się zalogować
        </Modal>
      )}
    </div>
  );
}

export default Register;
