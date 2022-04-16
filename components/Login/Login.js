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
import Link from "next/link";

import classes from "./Login.module.css";

function Login() {
  const { login } = useAuth();
  const [values, setValues] = useState({
    login: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const emailRef = useRef();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
    });
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      await login(values.login, values.password);
      router.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={classes.container}>
      <TextField
        label="E-mail"
        id="outlined-end-adornment"
        ref={emailRef}
        onChange={handleChange("login")}
        sx={{ m: 1, width: "25ch" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
      <Button
        onClick={loginHandler}
        className={classes.sendButton}
        variant="contained"
        endIcon={<SendIcon />}
      >
        Zaloguj się
      </Button>
      <Link href="/register">Zarejestruj się</Link>
    </div>
  );
}

export default Login;
