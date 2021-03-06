import { useState, useRef, useEffect } from "react";

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
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import classes from "./Register.module.css";
import Link from "next/link";

import { database } from "../../config/firebase";
import { ref, onValue } from "firebase/database";

import Modal from "../Modals/Modal";
import successIcon from '../static/success.png';

function Register() {
  const { signUp } = useAuth();
  const [error, setError] = useState(null);

  const [showAddAlert, setAddShowAlert] = useState(false);

  const router = useRouter();
  const db = database;

  const showAlert = () => {
    setAddShowAlert(prevState => !prevState);
  }
  const emailRef = useRef();

  const [fetchedCode, setFetchedCode] = useState(0);

  const [values, setValues] = useState({
    login: "",
    password: "",
    code: "",
    showPassword: false,
  });

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
    if(parseInt(values.code) === fetchedCode) {
      try {
        setError(null);
        await signUp(values.login, values.password);
        setAddShowAlert(true);
        setTimeout(() => setAddShowAlert(false), 5000);
        setTimeout(() => router.push('/login'), 3000);
  
      } catch (err) {
        setError(err);
      }
    } else {
      setError('codeError');
    }
    
  };

  const fetchCodeHandler = () => {
    const getData = ref(db, "code/");
    onValue(getData, (snapshot) => {
      const data = snapshot.val();
      const dataArray = Object.entries(data);
      const secCode = dataArray[0][1];
      setFetchedCode(secCode);
    });
  }

  useEffect(() => {
    fetchCodeHandler();
  }, [])

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
      <TextField
        label="Kod"
        type="number"
        id="secret-code"
        placeholder="Sekretny kod dostarczony przez admina"
        onChange={handleChange("code")}
        sx={{ m: 1, width: "25ch", bgcolor: 'white' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <VpnKeyIcon sx={{ ml: 0.25, mr: -0.5 }} />
            </InputAdornment>
          ),
        }}
      />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Has??o</InputLabel>
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
      {error !== null && error !== 'codeError' && <span className={classes.error}>Wprowadzono nieprawid??owe dane!</span>}
      {error === 'codeError' && <span className={classes.error}>Wprowadzono nieprawid??owy kod!</span>}
      <Button
        onClick={signUpHandler}
        className={classes.sendButton}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Zarejestruj si??
      </Button>
      <div className={classes.registerButton}>
        <Link href="/login">Zaloguj si??</Link>
      </div>
      {showAddAlert && error === null && (
        <Modal src={successIcon} onClose={showAlert}>
          Utworzono konto! Mo??esz si?? zalogowa??
        </Modal>
      )}
    </div>
  );
}

export default Register;
