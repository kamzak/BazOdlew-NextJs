import { Fragment } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import classes from "./AnalizaForm.module.css";

function AnalizaForm() {
  return (
    <Fragment>
      <span className={classes.intro}>
        Wprowadź dane [ * - pole obowiązkowe ]:
      </span>
      <section className={classes.section}>
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="Nr wytopu"
          placeholder="Np. 2324"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="Rodzaj metalu"
          placeholder="Np. sfero, ADI, szare"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="Gatunek"
          placeholder="Np. GJS 500-7"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="C [węgiel] [%]"
          placeholder="udział % C"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="Si [węgiel] [%]"
          placeholder="udział % Si"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="Mn [węgiel] [%]"
          placeholder="udział % Mn"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="Mg [węgiel] [%]"
          placeholder="udział % Mg"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="P [węgiel] [%]"
          placeholder="udział % P"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="S [węgiel] [%]"
          placeholder="udział % S"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="Cu [węgiel] [%]"
          placeholder="udział % Cu"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="Ce [węgiel] [%]"
          placeholder="udział % Ce"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="La[węgiel] [%]"
          placeholder="udział % La"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="Zr [węgiel] [%]"
          placeholder="udział % Zr"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="Bi [węgiel] [%]"
          placeholder="udział % Bi"
        />
        <TextField
          className={classes.input}
          required
          id="filled-required"
          label="Ca [węgiel] [%]"
          placeholder="udział % Ca"
        />
      </section>
      <Button className={classes.sendButton} variant="contained" endIcon={<SendIcon />}>
        Dodaj wyniki
      </Button>
    </Fragment>
  );
}

export default AnalizaForm;
