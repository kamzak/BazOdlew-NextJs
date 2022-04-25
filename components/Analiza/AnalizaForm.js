import { Fragment, useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import InputAdornment from "@mui/material/InputAdornment";
import classes from "./AnalizaForm.module.css";
import { database } from "../../config/firebase";
import { ref, set } from "firebase/database";
import useInput from "../../hooks/use-input";

const GATUNKI = [
	"GJL-150",
	"GJL-200",
	"GJL-250",
	"GJL-300",
	"GJL-350",
	"GJS-400-15",
	"GJS-400-18",
	"GJS-400-18-LT",
	"GJS-450-10",
	"GJS-500-7",
	"GJS-600-3",
	"GJS-700-2",
	"GJS-800-10",
	"GJS-800-10-RT",
	"GJS-900-8",
	"GJS-1050-6",
	"GJS-1200-3",
	"GJS-1400-1",
];

const RODZAJE_METALI = [
	"Żeliwo sferoidalne",
	"Żeliwo ADI",
	"Żeliwo szare",
	"Żeliwo białe",
	"Żeliwo wermikularne",
	"Żeliwo SiMo",
];

function AnalizaForm() {
	const [nrWyt, setNrWyt] = useState("");
	const [wytTouched, setWytTouched] = useState(false);
	const [wytExist, setWytExist] = useState("");

	const [gat, setGat] = useState("");
	const [gatTouched, setGatTouched] = useState(false);

	const [rodz, setRodz] = useState("");
	const [rodzTouched, setRodzTouched] = useState(false);

	const [formIsValid, setFormIsValid] = useState(false);

	const wytValid = nrWyt.trim() !== "";
	const wytInvalid = !wytValid && wytTouched;

	const gatIsValid = gat !== null && gat !== "";
	const gatInvalid = !gatIsValid && gatTouched;

	const rodzIsValid = rodz !== null && rodz !== "";
	const rodzInvalid = !rodzIsValid && rodzTouched;

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
	const gatChange = (event, value) => {
    if(value === null) {
      setGat('');
    } else {
      setGat(value);
    }
	};

	const gatBlur = () => {
		setGatTouched(true);
	};

	// Rodzaj metalu
	const rodzChange = (event, value) => {
		if (value === null) {
			setRodz("");
		} else {
			setRodz(value);
		}
	};

	const rodzBlur = () => {
		setRodzTouched(true);
	};

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
		setGat("");
		setGatTouched(false);
		gatChange(0, "");
		setRodz("");
		setRodzTouched(false);
		rodzChange(0, "");
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

	useEffect(() => {
		if (
			wytValid &&
			gatIsValid &&
			rodzIsValid &&
			CIsValid &&
			SiIsValid &&
			MnIsValid &&
			MgIsValid &&
			PIsValid &&
			SIsValid &&
			CuIsValid &&
			CeIsValid &&
			LaIsValid &&
			ZrIsValid &&
			BiIsValid &&
			CaIsValid
		) {
			setFormIsValid(true);
		} else {
			setFormIsValid(false);
		}
	}, [
		wytValid,
		gatIsValid,
		rodzIsValid,
		CIsValid,
		SiIsValid,
		MnIsValid,
		MgIsValid,
		PIsValid,
		SIsValid,
		CuIsValid,
		CeIsValid,
		LaIsValid,
		ZrIsValid,
		BiIsValid,
		CaIsValid,
	]);

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
							error={wytInvalid}
							className={classes.input}
							required
							id="outlined-required"
							label="Nr wytopu"
							placeholder="Np. 2324"
							onChange={nrWytChange}
							onBlur={wytBlur}
							value={nrWyt}
							variant="outlined"
              autoComplete='off'
							sx={{
								borderRadius: "5px 5px 0 0",
							}}
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.infoWyt}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Numer wytopu musi zawierać od 1 do 6 cyfr"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<Autocomplete
							id="free-solo-demo"
							options={RODZAJE_METALI}
							className={classes.input}
							freeSolo
							value={rodz}
							onChange={rodzChange}
							inputValue={rodz}
							onInputChange={rodzChange}
							onBlur={rodzBlur}
							defaultValue={""}
							renderInput={(params) => (
								<TextField
									{...params}
									error={rodzInvalid}
									required
									label="Rodzaj metalu"
									placeholder="Np. sfero, ADI, szare"
									InputProps={{
										...params.InputProps,
										endAdornment: (
											<InputAdornment
												position="end"
												className={classes.info}
											>
												<Tooltip
													placement="top"
													arrow
													title={
														"Wpisz lub wybierz dany rodzaj metalu"
													}
												>
													<Button tabIndex={-1}>
														<InfoIcon />
													</Button>
												</Tooltip>
											</InputAdornment>
										),
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<Autocomplete
							id="free-solo-demo"
							options={GATUNKI}
							className={classes.input}
							freeSolo
							value={gat}
							onChange={gatChange}
							onBlur={gatBlur}
              inputValue={gat}
							onInputChange={gatChange}
							renderInput={(params) => (
								<TextField
									{...params}
									error={gatInvalid}
									required
									label="Gatunek"
									placeholder="Np. GJS 500-7"
									InputProps={{
										...params.InputProps,
										endAdornment: (
											<InputAdornment
												position="end"
												className={classes.info}
											>
												<Tooltip
													placement="top"
													arrow
													title={
														"Wpisz lub wybierz gatunek"
													}
												>
													<Button tabIndex={-1}>
														<InfoIcon />
													</Button>
												</Tooltip>
											</InputAdornment>
										),
									}}
								/>
							)}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={CHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="C [węgiel] [%]"
							placeholder="udział % C"
							value={C}
							onChange={CChange}
							onBlur={CBlur}
							variant="outlined"
              autoComplete='off'
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.info}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Zawartość procentowa pierwiastka. Wartość od 0 do 100. Maksymalnie do 5 cyfr po kropce"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={SiHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Si [krzem] [%]"
							placeholder="udział % Si"
							value={Si}
							onChange={SiChange}
							onBlur={SiBlur}
							variant="outlined"
              autoComplete='off'
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.info}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Zawartość procentowa pierwiastka. Wartość od 0 do 100. Maksymalnie do 5 cyfr po kropce"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={MnHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Mn [mangan] [%]"
							placeholder="udział % Mn"
							value={Mn}
							onChange={MnChange}
							onBlur={MnBlur}
							variant="outlined"
              autoComplete='off'
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.info}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Zawartość procentowa pierwiastka. Wartość od 0 do 100. Maksymalnie do 5 cyfr po kropce"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={MgHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Mg [magnez] [%]"
							placeholder="udział % Mg"
							value={Mg}
							onChange={MgChange}
							onBlur={MgBlur}
							variant="outlined"
              autoComplete='off'
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.info}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Zawartość procentowa pierwiastka. Wartość od 0 do 100. Maksymalnie do 5 cyfr po kropce"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={PHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="P [fosfor] [%]"
							placeholder="udział % P"
							value={P}
							onChange={PChange}
							onBlur={PBlur}
							variant="outlined"
              autoComplete='off'
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.info}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Zawartość procentowa pierwiastka. Wartość od 0 do 100. Maksymalnie do 5 cyfr po kropce"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={SHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="S [siarka] [%]"
							placeholder="udział % S"
							value={S}
							onChange={SChange}
							onBlur={SBlur}
							variant="outlined"
              autoComplete='off'
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.info}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Zawartość procentowa pierwiastka. Wartość od 0 do 100. Maksymalnie do 5 cyfr po kropce"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={CuHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Cu [miedź] [%]"
							placeholder="udział % Cu"
							value={Cu}
							onChange={CuChange}
							onBlur={CuBlur}
							variant="outlined"
              autoComplete='off'
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.info}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Zawartość procentowa pierwiastka. Wartość od 0 do 100. Maksymalnie do 5 cyfr po kropce"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={CeHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Ce [cer] [%]"
							placeholder="udział % Ce"
							value={Ce}
							onChange={CeChange}
							onBlur={CeBlur}
							variant="outlined"
              autoComplete='off'
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.info}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Zawartość procentowa pierwiastka. Wartość od 0 do 100. Maksymalnie do 5 cyfr po kropce"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={LaHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="La [lantan] [%]"
							placeholder="udział % La"
							value={La}
							onChange={LaChange}
							onBlur={LaBlur}
							variant="outlined"
              autoComplete='off'
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.info}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Zawartość procentowa pierwiastka. Wartość od 0 do 100. Maksymalnie do 5 cyfr po kropce"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={ZrHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Zr [cyrkon] [%]"
							placeholder="udział % Zr"
							value={Zr}
							onChange={ZrChange}
							onBlur={ZrBlur}
							variant="outlined"
              autoComplete='off'
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.info}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Zawartość procentowa pierwiastka. Wartość od 0 do 100. Maksymalnie do 5 cyfr po kropce"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={BiHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Bi [bizmut] [%]"
							placeholder="udział % Bi"
							value={Bi}
							onChange={BiChange}
							onBlur={BiBlur}
							variant="outlined"
              autoComplete='off'
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.info}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Zawartość procentowa pierwiastka. Wartość od 0 do 100. Maksymalnie do 5 cyfr po kropce"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={CaHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Ca [wapń] [%]"
							placeholder="udział % Ca"
							value={Ca}
							onChange={CaChange}
							onBlur={CaBlur}
							variant="outlined"
              autoComplete='off'
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										className={classes.info}
									>
										<Tooltip
											placement="top"
											arrow
											title={
												"Zawartość procentowa pierwiastka. Wartość od 0 do 100. Maksymalnie do 5 cyfr po kropce"
											}
										>
											<Button tabIndex={-1}>
												<InfoIcon />
											</Button>
										</Tooltip>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
				</Grid>
				<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="center"
				>
					<Grid item xs={12} md={3} lg={3}></Grid>
					<Grid item xs={12} md={6} lg={3}>
						<Button
							onClick={submitHandler}
							className={classes.sendButton}
							variant="contained"
							endIcon={<SendIcon />}
							disabled={!formIsValid}
						>
							Dodaj wyniki
						</Button>
					</Grid>
					<Grid item xs={12} md={3} lg={3}></Grid>
				</Grid>
			</Box>
		</Fragment>
	);
}

export default AnalizaForm;
