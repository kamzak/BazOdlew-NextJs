import { Fragment, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import classes from "./AnalizaForm.module.css";
import { database } from "../../config/firebase";
import { ref, set } from "firebase/database";
import useInput from "../../hooks/use-input";

function AnalizaForm() {
  const [nrWyt, setNrWyt] = useState("");
  const [wytTouched, setWytTouched] = useState(false);
  const [wytExist, setWytExist] = useState("");

  const wytValid = nrWyt.trim() !== "" && wytExist === "";
  const wytInvalid = !wytValid && wytTouched;

  const wytBlur = () => {
    setWytTouched(true);
    // datas.map((item) => {
    //   itemNr = item.nrWyt;
    //   if (itemNr === wyt) {
    //     let temp = `${itemNr} już istnieje w bazie!`;
    //     setWytExist(temp);
    //   }
    // });
  };

  const nrWytChange = (event) => {
    setWytTouched(true);
    if (event.target.value.length <= 6 && event.target.value >= 0) {
      setNrWyt(event.target.value);
    }

    // if (event.target.value === "" || event.target.value !== itemNr) {
    //   setWytExist("");
    // }
  };

  // Gatunek
  const {
    value: gat,
    isValid: gatIsValid,
    hasError: gatHasError,
    valueChangeHandler: gatChange,
    inputBlurHandler: gatBlur,
    reset: resetGat,
  } = useInput((value) => value.trim() !== "", "25");

  // Rodz metalu
  const {
    value: rodz,
    isValid: rodzIsValid,
    hasError: rodzHasError,
    valueChangeHandler: rodzChange,
    inputBlurHandler: rodzBlur,
    reset: resetRodz,
  } = useInput((value) => value.trim() !== "", "25");

  // C
  const {
    value: C,
    isValid: CIsValid,
    hasError: CHasError,
    valueChangeHandler: CChange,
    inputBlurHandler: CBlur,
    reset: resetC,
  } = useInput((value) => value.trim() !== "", "7", false, true);

  // Si
  const {
    value: Si,
    isValid: SiIsValid,
    hasError: SiHasError,
    valueChangeHandler: SiChange,
    inputBlurHandler: SiBlur,
    reset: resetSi,
  } = useInput((value) => value.trim() !== "", "7", false, true);

  // Mn
  const {
    value: Mn,
    isValid: MnIsValid,
    hasError: MnHasError,
    valueChangeHandler: MnChange,
    inputBlurHandler: MnBlur,
    reset: resetMn,
  } = useInput((value) => value.trim() !== "", "7", false, true);

  // Mg
  const {
    value: Mg,
    isValid: MgIsValid,
    hasError: MgHasError,
    valueChangeHandler: MgChange,
    inputBlurHandler: MgBlur,
    reset: resetMg,
  } = useInput((value) => value.trim() !== "", "7", false, true);

  // P
  const {
    value: P,
    isValid: PIsValid,
    hasError: PHasError,
    valueChangeHandler: PChange,
    inputBlurHandler: PBlur,
    reset: resetP,
  } = useInput((value) => value.trim() !== "", "7", false, true);

  // S
  const {
    value: S,
    isValid: SIsValid,
    hasError: SHasError,
    valueChangeHandler: SChange,
    inputBlurHandler: SBlur,
    reset: resetS,
  } = useInput((value) => value.trim() !== "", "7", false, true);

  // Cu
  const {
    value: Cu,
    isValid: CuIsValid,
    hasError: CuHasError,
    valueChangeHandler: CuChange,
    inputBlurHandler: CuBlur,
    reset: resetCu,
  } = useInput((value) => value.trim() !== "", "7", false, true);

  // Ce
  const {
    value: Ce,
    isValid: CeIsValid,
    hasError: CeHasError,
    valueChangeHandler: CeChange,
    inputBlurHandler: CeBlur,
    reset: resetCe,
  } = useInput((value) => value.trim() !== "", "7", false, true);

  // La
  const {
    value: La,
    isValid: LaIsValid,
    hasError: LaHasError,
    valueChangeHandler: LaChange,
    inputBlurHandler: LaBlur,
    reset: resetLa,
  } = useInput((value) => value.trim() !== "", "7", false, true);

  // Zr
  const {
    value: Zr,
    isValid: ZrIsValid,
    hasError: ZrHasError,
    valueChangeHandler: ZrChange,
    inputBlurHandler: ZrBlur,
    reset: resetZr,
  } = useInput((value) => value.trim() !== "", "7", false, true);

  // Bi
  const {
    value: Bi,
    isValid: BiIsValid,
    hasError: BiHasError,
    valueChangeHandler: BiChange,
    inputBlurHandler: BiBlur,
    reset: resetBi,
  } = useInput((value) => value.trim() !== "", "7", false, true);

  // Ca
  const {
    value: Ca,
    isValid: CaIsValid,
    hasError: CaHasError,
    valueChangeHandler: CaChange,
    inputBlurHandler: CaBlur,
    reset: resetCa,
  } = useInput((value) => value.trim() !== "", "7", false, true);

  const submitHandler = (event) => {
    event.preventDefault();

    if (!wytValid) {
      return;
    }
    // Formating date
    const date = new Date();
    const formatedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;

    // Connecting database
    const db = database;

    // Adjusting db id
    let id = parseInt(nrWyt) - 1;

    // Uploading data to Realtime Database
    set(ref(db, "analizaNext/" + id), {
      wyt: parseInt(nrWyt),
      rodzMet: rodz,
      gat: gat,
      id: parseInt(nrWyt),
      data: formatedDate,
      C: parseFloat(C),
      Si: parseFloat(Si),
      Mn: parseFloat(Mn),
      Mg: parseFloat(Mg),
      P: parseFloat(P),
      S: parseFloat(S),
      Cu: parseFloat(Cu),
      Ce: parseFloat(Ce),
      La: parseFloat(La),
      Zr: parseFloat(Zr),
      Bi: parseFloat(Bi),
      Ca: parseFloat(Ca),
    }).then(alert("Dodano rekord!"));

    //Clear inputs

    setNrWyt("");
    setWytTouched(false);
    resetGat();
    resetRodz();
    resetC();
    resetSi();
    resetMn();
    resetMg();
    resetP();
    resetS();
    resetCu();
    resetCe();
    resetLa();
    resetZr();
    resetBi();
    resetCa();
  };

  return (
    <Fragment>
      <Box sx={{ flexGrow: 1 }} className={classes.grid}>
        <Grid container spacing={1.4}>
          <Grid item xs={12}>
            <p className={classes.intro}>
              Wprowadź dane [ * - pole obowiązkowe ]:
            </p>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="Nr wytopu"
              placeholder="Np. 2324"
              onChange={nrWytChange}
              onBlur={wytBlur}
              value={nrWyt}
              variant="outlined"
              sx={{
                borderRadius: "5px 5px 0 0",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="Rodzaj metalu"
              placeholder="Np. sfero, ADI, szare"
              value={rodz}
              onChange={rodzChange}
              onBlur={rodzBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="Gatunek"
              placeholder="Np. GJS 500-7"
              value={gat}
              onChange={gatChange}
              onBlur={gatBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="C [węgiel] [%]"
              placeholder="udział % C"
              value={C}
              onChange={CChange}
              onBlur={CBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="Si [krzem] [%]"
              placeholder="udział % Si"
              value={Si}
              onChange={SiChange}
              onBlur={SiBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="Mn [mangan] [%]"
              placeholder="udział % Mn"
              value={Mn}
              onChange={MnChange}
              onBlur={MnBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="Mg [magnez] [%]"
              placeholder="udział % Mg"
              value={Mg}
              onChange={MgChange}
              onBlur={MgBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="P [fosfor] [%]"
              placeholder="udział % P"
              value={P}
              onChange={PChange}
              onBlur={PBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="S [siarka] [%]"
              placeholder="udział % S"
              value={S}
              onChange={SChange}
              onBlur={SBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="Cu [miedź] [%]"
              placeholder="udział % Cu"
              value={Cu}
              onChange={CuChange}
              onBlur={CuBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="Ce [cer] [%]"
              placeholder="udział % Ce"
              value={Ce}
              onChange={CeChange}
              onBlur={CeBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="La [lantan] [%]"
              placeholder="udział % La"
              value={La}
              onChange={LaChange}
              onBlur={LaBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="Zr [cyrkon] [%]"
              placeholder="udział % Zr"
              value={Zr}
              onChange={ZrChange}
              onBlur={ZrBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="Bi [bizmut] [%]"
              placeholder="udział % Bi"
              value={Bi}
              onChange={BiChange}
              onBlur={BiBlur}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <TextField
              className={classes.input}
              required
              id="outlined-required"
              label="Ca [wapń] [%]"
              placeholder="udział % Ca"
              value={Ca}
              onChange={CaChange}
              onBlur={CaBlur}
              variant="outlined"
            />
          </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item  xs={12} md={3} lg={3}></Grid>
            <Grid item  xs={12} md={6} lg={3}>
            <Button
              onClick={submitHandler}
              className={classes.sendButton}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Dodaj wyniki
            </Button>
            </Grid>
            <Grid item  xs={12} md={3} lg={3}></Grid>
          </Grid>
      </Box>
    </Fragment>
  );
}

export default AnalizaForm;
