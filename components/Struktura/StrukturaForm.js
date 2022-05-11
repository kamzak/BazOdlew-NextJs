import { Fragment, useState, useRef, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import InfoIcon from "@mui/icons-material/Info";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from '@mui/material/InputLabel';
import classes from "./StrukturaForm.module.css";
import { database, storage } from "../../config/firebase";
import { ref, set, update } from "firebase/database";
import { ref as sRef, getDownloadURL, uploadBytes } from 'firebase/storage';
import "firebase/compat/storage";
import 'firebase/compat/database';
import 'firebase/storage';
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

function StrukturaForm() {
	const [nrWyt, setNrWyt] = useState("");
	const [wytTouched, setWytTouched] = useState(false);
	const [wytExist, setWytExist] = useState("");

	const [gat, setGat] = useState("");
	const [gatTouched, setGatTouched] = useState(false);

	const [rodz, setRodz] = useState("");
	const [rodzTouched, setRodzTouched] = useState(false);

	const [formIsValid, setFormIsValid] = useState(false);

	const [showAddAlert, setAddShowAlert] = useState(false);

	const showAlert = () => {
		setAddShowAlert(prevState => !prevState);
	}

	const wytValid = nrWyt.trim() !== "";
	const wytInvalid = !wytValid && wytTouched;

	const gatIsValid = gat !== null && gat !== "";
	const gatInvalid = !gatIsValid && gatTouched;

	const rodzIsValid = rodz !== null && rodz !== "";
	const rodzInvalid = !rodzIsValid && rodzTouched;

	const img1Ref = useRef();
	const img2Ref = useRef();

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

	// Liczb wydz
	const {
		value: wydz,
		isValid: wydzIsValid,
		hasError: wydzHasError,
		valueChangeHandler: wydzChange,
		inputBlurHandler: wydzBlur,
		reset: resetWydz,
	} = useInput((value) => value.trim() !== "", "15", false);

	// Stopień sferoidalności
	const {
		value: sfer,
		isValid: sferIsValid,
		hasError: sferHasError,
		valueChangeHandler: sferChange,
		inputBlurHandler: sferBlur,
		reset: resetSfer,
	} = useInput((value) => value.trim() !== "", "7", false, true);

	// Udział grafitu
	const {
		value: graf,
		isValid: grafIsValid,
		hasError: grafHasError,
		valueChangeHandler: grafChange,
		inputBlurHandler: grafBlur,
		reset: resetGraf,
	} = useInput((value) => value.trim() !== "", "7", false, true);

	// Udział perlitu
	const {
		value: perl,
		isValid: perlIsValid,
		hasError: perlHasError,
		valueChangeHandler: perlChange,
		inputBlurHandler: perlBlur,
		reset: resetPerl,
	} = useInput((value) => value.trim() !== "", "7", false, true);

	// Udział ferrytu
	const {
		value: fer,
		isValid: ferIsValid,
		hasError: ferHasError,
		valueChangeHandler: ferChange,
		inputBlurHandler: ferBlur,
		reset: resetFer,
	} = useInput((value) => value.trim() !== "", "7", false, true);

	// Zdjęcie przed trawieniem
	const [zdj1, setZdj1] = useState("");
	const [zdj1Touched, setZdj1Touched] = useState(false);

	const zdj1Valid = zdj1 !== "" && zdj1 !== undefined && zdj1 !== null;
	const zdj1Invalid = !zdj1Valid && zdj1Touched;

	const zdj1Blur = () => {
		setZdj1Touched(true);
	};

	// Zdjęcie po trawieniu
	const [zdj2, setZdj2] = useState("");
	const [zdj2Touched, setZdj2Touched] = useState(false);

	const zdj2Valid = zdj2 !== "" && zdj2 !== undefined && zdj2 !== null;
	const zdj2Invalid = !zdj2Valid && zdj2Touched;

	const zdj2Blur = () => {
		setZdj2Touched(true);
	};

	// Insert first image func
	const zdj1Change = (e) => {
		if (e.target.files[0]) {
			setZdj1(e.target.files[0]);
		} else {
			setFormIsValid(false);
		}
	};
	// Insert second image func
	const zdj2Change = (e) => {
		if (e.target.files[0]) {
			setZdj2(e.target.files[0]);
		} else {
			setFormIsValid(false);
		}
	};

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

		const storageRef1 = sRef(storage, `images/${nrWyt}_1`);
		const storageRef2 = sRef(storage, `images/${nrWyt}_2`);
		uploadBytes(storageRef1, zdj1).then(snapshot => {
			getDownloadURL(snapshot.ref).then(url => {
				update(ref(db, "strukturaNext/" + id), {
					str1: url
				})
			});
		});
		uploadBytes(storageRef2, zdj2).then(snapshot => {
			getDownloadURL(snapshot.ref).then(url => {
				update(ref(db, "strukturaNext/" + id), {
					str2: url
				})
			});
		})
		set(ref(db, "strukturaNext/" + id), {
			wyt: parseInt(nrWyt),
			rodzMet: rodz,
			gat: gat,
			id: parseInt(nrWyt),
			data: formatedDate,
			wydz: parseFloat(wydz),
			sfer: parseFloat(sfer),
			graf: parseFloat(graf),
			perl: parseFloat(perl),
			fer: parseFloat(fer),
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
		resetWydz();
		resetSfer();
		resetGraf();
		resetPerl();
		resetFer();
		setZdj1(null);
		setZdj1Touched(false);
		img1Ref.current.value = null;
		setZdj2(null);
		setZdj2Touched(false);
		img2Ref.current.value = null;
	};

	useEffect(() => {
		if (
			wytValid &&
			gatIsValid &&
			rodzIsValid &&
			wydzIsValid &&
			sferIsValid &&
			grafIsValid &&
			perlIsValid &&
			ferIsValid &&
			zdj1Valid &&
			zdj2Valid
		) {
			setFormIsValid(true);
		} else {
			setFormIsValid(false);
		}
	}, [
		wytValid,
		gatIsValid,
		rodzIsValid,
		wydzIsValid,
		sferIsValid,
		grafIsValid,
		perlIsValid,
		ferIsValid,
		zdj1Invalid,
		zdj2Invalid,
		zdj1,
		zdj2
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
							error={wydzHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Liczba wydzieleń grafitu [1/mm2]"
							placeholder="np. 123"
							value={wydz}
							onChange={wydzChange}
							onBlur={wydzBlur}
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
												"Liczba wydzieleń grafitu na mm2. Wartość pobrana z programu na podstawie zdjęcia struktury"
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
							error={sferHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Stopień sferoidalności grafitu [%]"
							placeholder="sferoidalność"
							value={sfer}
							onChange={sferChange}
							onBlur={sferBlur}
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
												"Stopień sferoidalności kulek grafitu wyrażony w procentach. Maksymalnie do 5 cyfr po kropce"
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
							error={grafHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Udział grafitu [%]"
							placeholder="udział % grafitu"
							value={graf}
							onChange={grafChange}
							onBlur={grafBlur}
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
												"Udział procentowy grafitu w strukturze. Maksymalnie do 5 cyfr po kropce"
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
							error={perlHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Udział perlitu [%]"
							placeholder="udział % perlitu"
							value={perl}
							onChange={perlChange}
							onBlur={perlBlur}
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
												"Udział procentowy perlitu w strukturze. Maksymalnie do 5 cyfr po kropce"
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
							error={ferHasError}
							className={classes.input}
							required
							id="outlined-required"
							label="Udział ferrytu [%]"
							placeholder="udział % ferrytu"
							value={fer}
							onChange={ferChange}
							onBlur={ferBlur}
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
												"Udział procentowy ferrytu w strukturze. Maksymalnie do 5 cyfr po kropce"
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
						<InputLabel htmlFor="outlined-required">
							Zdjęcie struktury przed trawieniem *
						</InputLabel>
						<TextField
							error={zdj1Invalid}
							className={classes.input}
							required
							id="outlined-required"
							onChange={zdj1Change}
							onBlur={zdj1Blur}
							type="file"
							inputRef={img1Ref}
							variant="standard"
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
												"Zdjęcie struktury przed trawieniem uzyskane przy użyciu odpowiedniego programu podłączonego do mikroskopu"
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
						<InputLabel htmlFor="outlined-required">
							Zdjęcie struktury po trawieniu *
						</InputLabel>
						<TextField
							error={zdj2Invalid}
							className={classes.input}
							required
							id="outlined-required"
							onChange={zdj2Change}
							onBlur={zdj2Blur}
							type="file"
							inputRef={img2Ref}
							variant="standard"
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
												"Zdjęcie struktury po trawieniu uzyskane przy użyciu odpowiedniego programu podłączonego do mikroskopu"
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

export default StrukturaForm;
