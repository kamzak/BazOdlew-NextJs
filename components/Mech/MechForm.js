import { Fragment, useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputAdornment from "@mui/material/InputAdornment";
import classes from "./MechForm.module.css";
import { database } from "../../config/firebase";
import { ref, set } from "firebase/database";
import useInput from "../../hooks/use-input";
import Modal from "../Modals/Modal";
import successIcon from '../static/success.png';

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

function MechForm() {
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

	const [twarSelect, setTwarSelect] = useState("HB");
	const [udarSelect, setUdarSelect] = useState("KC");

	const [showAddAlert, setAddShowAlert] = useState(false);

	const showAlert = () => {
		setAddShowAlert(prevState => !prevState);
	}

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
		if (value === null) {
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

	// Wytrzymałość na rozciąganie Rm
	const {
		value: wytrzRm,
		isValid: wytrzRmIsValid,
		hasError: wytrzRmHasError,
		valueChangeHandler: wytrzRmChange,
		inputBlurHandler: wytrzRmBlur,
		reset: resetWytrzRm,
	} = useInput((value) => value.trim() !== "", "15", false);

	// Granica plastyczności Rp0,2
	const {
		value: granicaRp,
		isValid: granicaRpIsValid,
		hasError: granicaRpHasError,
		valueChangeHandler: granicaRpChange,
		inputBlurHandler: granicaRpBlur,
		reset: resetGranicaRp,
	} = useInput((value) => value.trim() !== "", "15", false);

	// Wydłużenie względne A10
	const {
		value: wydl,
		isValid: wydlIsValid,
		hasError: wydlHasError,
		valueChangeHandler: wydlChange,
		inputBlurHandler: wydlBlur,
		reset: resetWydl,
	} = useInput((value) => value.trim() !== "", "10", false);

	// Moduł Younga E
	const {
		value: young,
		isValid: youngIsValid,
		hasError: youngHasError,
		valueChangeHandler: youngChange,
		inputBlurHandler: youngBlur,
		reset: resetYoung,
	} = useInput((value) => value.trim() !== "", "10", false);

	// Twardość
	const {
		value: twar,
		isValid: twarIsValid,
		hasError: twarHasError,
		valueChangeHandler: twarChange,
		inputBlurHandler: twarBlur,
		reset: resetTwar,
	} = useInput((value) => value.trim() !== "", "7", false);

	// Udarność
	const {
		value: udar,
		isValid: udarIsValid,
		hasError: udarHasError,
		valueChangeHandler: udarChange,
		inputBlurHandler: udarBlur,
		reset: resetUdar,
	} = useInput((value) => value.trim() !== "", "7", false);

	const handleUdarChange = (e) => {
		setUdarSelect(e.target.value);
	}

	const handleTwarChange = (e) => {
		setTwarSelect(e.target.value);
	}

	const submitHandler = async (event) => {
		event.preventDefault();

		if (!wytValid) {
			return;
		}
		// Formating date
		const date = new Date();
		const formatedDate = `${date.getDate()}/${date.getMonth() + 1
			}/${date.getFullYear()}`;

		// Connecting database
		const db = database;

		// Adjusting db id
		let id = parseInt(nrWyt);

		set(ref(db, "mechNext/" + id), {
			wyt: parseInt(nrWyt),
			rodzMet: rodz,
			gat: gat,
			id: parseInt(nrWyt),
			data: formatedDate,
			wytrzRm: parseFloat(wytrzRm),
			granicaRp: parseFloat(granicaRp),
			wydl: parseFloat(wydl),
			young: parseFloat(young),
			twar: twar +' '+ twarSelect,
			udar: udar +' '+ udarSelect,
		}
		).then(setAddShowAlert(true))
		.then(setTimeout(() => setAddShowAlert(false), 3000));

		//Clear inputs

		setNrWyt("");
		setWytTouched(false);
		setGat("");
		setGatTouched(false);
		gatChange(0, "");
		setRodz("");
		setRodzTouched(false);
		rodzChange(0, "");
		resetWytrzRm();
		resetGranicaRp();
		resetWydl();
		resetYoung();
		resetTwar();
		resetUdar();
	};

	useEffect(() => {
		if (
			wytValid &&
			gatIsValid &&
			rodzIsValid &&
			wytrzRmIsValid &&
			granicaRpIsValid &&
			wydlIsValid &&
			youngIsValid &&
			twarIsValid &&
			udarIsValid
		) {
			setFormIsValid(true);
		} else {
			setFormIsValid(false);
		}
	}, [
		wytValid,
		gatIsValid,
		rodzIsValid,
		wytrzRmIsValid,
		granicaRpIsValid,
		wydlIsValid,
		youngIsValid,
		twarIsValid,
		udarIsValid
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
					{showAddAlert && (
						<Modal src={successIcon} onClose={showAlert}>
							Wprowadzono wyniki!
						</Modal>
					)}
					<Grid item xs={12} md={6} lg={3}>
						<TextField
							error={wytInvalid}
							className={classes.input}
							required
							id="outlined-required"
							label="Nr wytopu"
							placeholder="np. 2324"
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
									placeholder="np. sfero, ADI, szare"
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
									placeholder="np. GJS 500-7"
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
							error={wytrzRmHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Wytrz. na rozciąganie Rm [MPa]"
							placeholder="np. 500"
							value={wytrzRm}
							onChange={wytrzRmChange}
							onBlur={wytrzRmBlur}
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
												"Wytrzymałość na rozciąganie to naprężenie, które odpowiada sile rozciągającej, uzyskanej podczas statycznej próby rozciągania."
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
							error={granicaRpHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Granica plastyczności Rp0,2 [MPa]"
							placeholder="np. 300"
							value={granicaRp}
							onChange={granicaRpChange}
							onBlur={granicaRpBlur}
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
												"Granica plastyczności to wartość naprężenia, przy którym zaczynają powstawać nieodwracalne mikroskopijne odkształcenia plastyczne we wszystkich ziarnach lub naprężenie w którym występuje płynięcie metalu pod wpływem stałego obciążenia"
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
							error={wydlHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Wydłużenie względne A10 [%]"
							placeholder="np. 20"
							value={wydl}
							onChange={wydlChange}
							onBlur={wydlBlur}
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
												"Udział procentowy grafitu w strukturze. Maksymalnie do 5 cyWydłużenie względne jest to stosunek odkształcenia bezwzględnego do początkowej długości odcinka pomiarowego"
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
							error={youngHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Moduł Younga E [GPa]"
							placeholder="np. dla żeliwa i stali - 190 ÷ 210"
							value={young}
							onChange={youngChange}
							onBlur={youngBlur}
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
												"Moduł Younga (E) – inaczej moduł odkształcalności liniowej albo moduł (współczynnik) sprężystości podłużnej – wielkość określająca sprężystość materiału. Wyraża ona, charakterystyczną dla danego materiału, zależność względnego odkształcenia liniowego ε materiału od naprężenia σ, jakie w nim występuje w zakresie odkształceń sprężystych"
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
						<Grid container spacing={1.4}>
							<Grid item xs={4} md={4} lg={4}>
								<Select
								className={classes.twarSelect}
									id="demo-simple-select"
									inputProps={{ 'aria-label': 'Without label' }}
									defaultValue="HB"
									value={twarSelect}
									onChange={handleTwarChange}
								>
									<MenuItem value="HB">HB</MenuItem>
									<MenuItem value="HV">HV</MenuItem>
									<MenuItem value="HRC">HRC</MenuItem>
								</Select>
							</Grid>
							<Grid item xs={8} md={8} lg={8}>
								<TextField
									error={twarHasError}
									className={classes.inputUdar}
									required
									id="outlined-required"
									label="Twardość"
									value={twar}
									onChange={twarChange}
									onBlur={twarBlur}
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
														"Twardość wyrażona w wybranej jednostce"
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
					</Grid>
					<Grid item xs={12} md={6} lg={3}>
						<Grid container spacing={1.4}>
							<Grid item xs={4} md={4} lg={4}>
								<Select
								className={classes.twarSelect}
									id="demo-simple-select"
									inputProps={{ 'aria-label': 'Without label' }}
									defaultValue="KC"
									value={udarSelect}
									onChange={handleUdarChange}
								>
									<MenuItem value="KC">KC</MenuItem>
									<MenuItem value="KV">KV</MenuItem>
									<MenuItem value="KU">KU</MenuItem>
								</Select>
							</Grid>
							<Grid item xs={8} md={8} lg={8}>
								<TextField
									error={udarHasError}
									className={classes.inputUdar}
									required
									id="outlined-required"
									label="Udarność"
									value={udar}
									onChange={udarChange}
									onBlur={udarBlur}
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
														"Udarność wyrażona w wybranej jednostce"
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
				</Grid>
			</Box>
		</Fragment>
	);
}

export default MechForm;
