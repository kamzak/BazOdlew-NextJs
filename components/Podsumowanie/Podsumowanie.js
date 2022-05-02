import { Fragment, useEffect, useState } from "react"
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import InfoIcon from "@mui/icons-material/Info";
import SearchIcon from '@mui/icons-material/Search';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import "firebase/compat/storage";
import 'firebase/compat/database';
import { ref, onValue, remove, set } from "firebase/database";
import { database } from "../../config/firebase";

import * as jsPDF from 'jspdf';
import autoTable from '../static/jspdf.plugin.autotable.js';
import '../static/Arial-normal';

import { columns, columnsAnaliza } from './ColumnsAnaliza';
import { columnsStruktura } from "./ColumnsStruktura";
import { columnsMech } from './ColumnsMech';
import classes from './Podsumowanie.module.css';
import { Grid } from "@mui/material";

const WYTOPY = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "325"
];

const Podsumowanie = ({ html }) => {
    const [search, setSearch] = useState("1");
    const [searchTouched, setSearchTouched] = useState(false);

    const [analizaData, setAnalizaData] = useState([]);
    const [analizaProperties, setAnalizaProperties] = useState([]);

    const [strukturaData, setStrukturaData] = useState([]);
    const [strukturaProperties, setStrukturaProperties] = useState([]);

    const [mechData, setMechData] = useState([]);
    const [mechProperties, setMechProperties] = useState([]);

    const searchIsValid = search !== null && search !== "";
    const searchInvalid = !searchIsValid && searchTouched;

    const db = database;


    // Wyszukiwanie
    const searchChange = (event, value) => {
        if (value === null) {
            setSearch('');
        } else {
            setSearch(value);
        }
    };

    const searchBlur = () => {
        setSearchTouched(true);
    };

    const fetchResults = async () => {
        const getAnaliza = ref(db, `analizaNext/${search}`);
        onValue(getAnaliza, (snapshot) => {
            const data = snapshot.val();
            setAnalizaData(data);
        });

        const getStruktura = ref(db, `strukturaNext/${search}`);
        onValue(getStruktura, (snapshot) => {
            const data = snapshot.val();
            setStrukturaData(data);
        });

        const getMech = ref(db, `mechNext/${search}`);
        onValue(getMech, (snapshot) => {
            const data = snapshot.val();
            setMechData(data);
        });
    }

    const formatPropertyAnaliza = (columns) => {
        const formatedColumns = [];
        columns.map(col => {
            formatedColumns.push({
                name: col.headerName,
                field: col.field
            });
        });
        setAnalizaProperties(formatedColumns);
    };

    const formatPropertyStruktura = (columns) => {
        const formatedColumns = [];
        columns.map(col => {
            formatedColumns.push({
                name: col.headerName,
                field: col.field
            });
        });
        setStrukturaProperties(formatedColumns);
    };

    const formatPropertyMech = (columns) => {
        const formatedColumns = [];
        columns.map(col => {
            formatedColumns.push({
                name: col.headerName,
                field: col.field
            });
        });
        setMechProperties(formatedColumns);
    };

    function getDataUri(url) {
        return new Promise(resolve => {
            var image = new Image();
            image.setAttribute('crossOrigin', 'anonymous'); //getting images from external domain
            image.onload = function (e) {

                var canvas = document.createElement('canvas');
                canvas.width = this.naturalWidth;
                canvas.height = this.naturalHeight;
                //next three lines for white background in case png has a transparent background
                var ctx = canvas.getContext('2d');
                ctx.fillStyle = '#fff';  /// set white fill style
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                canvas.getContext('2d').drawImage(this, 0, 0);

                resolve(canvas.toDataURL('image/jpeg'));
            };

            image.src = url;
        })
    }

    const generatePdf = async () => {
        const doc = new jsPDF();

        doc.setFont('Arial');

        let pageWidth = doc.internal.pageSize.getWidth();
        if (analizaData) {
            doc.text("Analiza chemiczna", pageWidth / 2, 17, 'center');
            autoTable(doc, {
                headStyles: { fillColor: '#1565c0', textColor: 'white', lineColor: '#1565c0', lineWidth: 0.1 },
                tableLineColor: '#1565c0',
                tableLineWidth: 0.1,
                columnStyles: {
                    0: { halign: 'center', lineWidth: 0.1, lineColor: 0, textColor: 0 },
                    1: { halign: 'center', lineWidth: 0.1, lineColor: 0, textColor: 0 }
                },
                styles: {
                    font: 'Arial',
                    fontStyle: 'normal',
                },
                startY: 20,
                html: '#analizaTable',
                useCss: true
            });
        }
        if (strukturaData) {
            doc.text("Struktura", pageWidth / 2, 157, 'center');
            autoTable(doc, {
                headStyles: { fillColor: '#1565c0', textColor: 'white', lineColor: '#1565c0', lineWidth: 0.1 },
                tableLineColor: '#1565c0',
                tableLineWidth: 0.1,
                columnStyles: {
                    0: { halign: 'center', lineWidth: 0.1, lineColor: 0, textColor: 0 },
                    1: { halign: 'center', lineWidth: 0.1, lineColor: 0, textColor: 0 }
                },
                styles: {
                    font: 'Arial',
                    fontStyle: 'normal',
                    cellWidth: 'wrap'
                },
                startY: 160,
                html: '#strukturaTable',
                useCss: true
            });
        }
        if (mechData) {
            if (analizaData && strukturaData) {
                doc.addPage();
            }
            doc.text("Właściwości mechaniczne", pageWidth / 2, 17, 'center');
            autoTable(doc, {
                tableLineColor: '#1565c0',
                tableLineWidth: 0.1,
                headStyles: { fillColor: '#1565c0', textColor: 'white', lineColor: '#1565c0', lineWidth: 0.1 },
                columnStyles: {
                    0: { halign: 'center', lineWidth: 0.1, lineColor: 0, textColor: 0 },
                    1: { halign: 'center', lineWidth: 0.1, lineColor: 0, textColor: 0 }
                },
                styles: {
                    font: 'Arial',
                    fontStyle: 'normal',
                    cellWidth: 'wrap'
                },
                startY: 20,
                html: '#mechTable',
                useCss: true
            });

        }

        if (strukturaData) {
            doc.addPage();

            var zdj1 = await getDataUri(strukturaData.str1);
            var zdj2 = await getDataUri(strukturaData.str2);
            const imgProps1 = doc.getImageProperties(zdj1);
            const imgProps2 = doc.getImageProperties(zdj2);
            const pdfWidth = doc.internal.pageSize.getWidth() - 30;
            const pdfHeight1 = (imgProps1.height * pdfWidth) / imgProps1.width;
            const pdfHeight2 = (imgProps2.height * pdfWidth) / imgProps2.width;
            doc.text("Struktura przed trawieniem", pageWidth / 2, 15, 'center');
            doc.addImage(zdj1, 'PNG', 15, 17, pdfWidth, pdfHeight1);
            doc.text("Struktura po trawieniu", pageWidth / 2, 147, 'center');
            doc.addImage(zdj2, 'PNG', 15, 150, pdfWidth, pdfHeight2);
        }


        doc.save(`Raport_${search}`);
    };


    useEffect(() => {
        fetchResults();
        formatPropertyAnaliza(columnsAnaliza);
        formatPropertyStruktura(columnsStruktura);
        formatPropertyMech(columnsMech);
    }, []);


    return <Fragment>
        <Grid className={classes.forms} container spacing={1.5}>
            <Grid item xs={6} md={6} lg={6} >
                <Autocomplete
                    id="free-solo-demo"
                    options={WYTOPY}
                    className={classes.input}
                    freeSolo
                    value={search}
                    onChange={searchChange}
                    onBlur={searchBlur}
                    inputValue={search}
                    onInputChange={searchChange}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={searchInvalid}
                            required
                            label="Szukaj wyników"
                            placeholder="wpisz numer wytopu aby pokazać wyniki..."
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
                                                "Wpisz lub numer wytopu"
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
            <Grid item xs={3} md={3} lg={3}>
                <Button
                    onClick={fetchResults}
                    className={classes.sendButton}
                    variant="contained"
                    endIcon={<SearchIcon />}
                >
                    Szukaj
                </Button>
            </Grid>
            <Grid item xs={3} md={3} lg={3}>
                <Button
                    onClick={generatePdf}
                    className={classes.sendButton}
                    variant="contained"
                    color="success"
                    endIcon={<PictureAsPdfIcon />}
                >
                    Generuj PDF
                </Button>
            </Grid>
        </Grid>
        <Grid container>
            {analizaData &&
                <Grid item flexGrow={1}>
                    <div key={analizaData.id} className={classes.headName}>
                        <h2>Analiza Chemiczna</h2>
                    </div>
                    <TableContainer className={classes.gridWrapper} >
                        <Table size="small" aria-label="a dense table" id="analizaTable" style={{ backgroundColor: 'white' }}>
                            <TableHead className={classes.tableHeader}>
                                <TableRow key={analizaData.id}>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ top: 57, minWidth: column.minWidth }}
                                        >
                                            {column.headerName}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {analizaProperties.map((prop, i) => {
                                    return <TableRow hover tabIndex={-1} key={prop.name}>
                                        <TableCell key={prop.headerName} align="center" className={classes.separator}>
                                            {prop.name}
                                        </TableCell>
                                        <TableCell key={i} align="center">
                                            {analizaData[prop.field]}
                                        </TableCell>
                                    </TableRow>
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>}
            {strukturaData && <Grid item flexGrow={1}>
                <div key={strukturaData.id} className={classes.headName}>
                    <h2>Struktura</h2>
                </div>
                <TableContainer className={classes.gridWrapper}>
                    <Table size="small" aria-label="a dense table" id="strukturaTable" style={{ backgroundColor: 'white' }}>
                        <TableHead className={classes.tableHeader}>
                            <TableRow key={strukturaData.id}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ top: 57, minWidth: column.minWidth }}
                                    >
                                        {column.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {strukturaProperties.map((prop) => {
                                return <TableRow hover tabIndex={-1} key={prop.name}>
                                    <TableCell key={prop.name} align="center" className={classes.separator}>
                                        {prop.name}
                                    </TableCell>
                                    <TableCell key={strukturaData.id} align="center" >
                                        {strukturaData[prop.field]}
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>}
            {mechData && <Grid item flexGrow={1}>
                <div key={mechData.id} className={classes.headName}>
                    <h2>Właściwości mechaniczne</h2>
                </div>
                <TableContainer className={classes.gridWrapper}>
                    <Table size="small" aria-label="a dense table" id="mechTable" style={{ backgroundColor: 'white' }}>
                        <TableHead className={classes.tableHeader}>
                            <TableRow key={mechData.id}>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ top: 57, minWidth: column.minWidth }}
                                    >
                                        {column.headerName}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mechProperties.map((prop, i) => {
                                return <TableRow hover tabIndex={-1} key={prop.name}>
                                    <TableCell key={prop.name} align="center" className={classes.separator}>
                                        {prop.name}
                                    </TableCell>
                                    <TableCell key={mechData.id} align="center" >
                                        {mechData[prop.field]}
                                    </TableCell>
                                </TableRow>
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>}
        </Grid>
        {strukturaData && <Grid container>
            <Grid item xs={12} md={6} lg={6} className={classes.struktury}>
                <h1>Struktura przed trawieniem</h1>
                <img id="str1" src={strukturaData.str1} alt="" />
            </Grid>
            <Grid item xs={12} md={6} lg={6} className={classes.struktury}>
                <h1>Struktura po trawieniu</h1>
                <img id="str2" src={strukturaData.str2} alt="" />
            </Grid>
        </Grid>}
    </Fragment >
}

export default Podsumowanie;