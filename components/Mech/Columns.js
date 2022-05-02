export const columns = [
    {
        field: "wyt",
        headerName: "Nr wytopu",
        headerClassName: "tableHeader",
        headerAlign: "center",
        align: "center",
        width: 100,
    },
    {
        field: "gat",
        headerName: "Gatunek",
        headerClassName: "tableHeader",
        headerAlign: "center",
        align: "center",
        width: 130,
        editable: false,
    },
    {
        field: "rodzMet",
        headerName: "Rodzaj metalu",
        headerClassName: "tableHeader",
        headerAlign: "center",
        align: "center",
        width: 150,
        editable: false,
    },
    {
        field: "wytrzRm",
        width: 270,
        headerClassName: "tableHeader",
        headerAlign: "center",
        align: "center",
        type: "number",
        editable: false,
        renderHeader: () => {
            return <span>Wytrzymałość na rozciąganie R<sub>m</sub> [MPa] </span>
        },
    },
    {
        field: "granicaRp",
        width: 245,
        headerClassName: "tableHeader",
        headerAlign: "center",
        align: "center",
        type: "number",
        editable: false,
        renderHeader: () => {
            return <span>Granica plastyczności R<sub>p0,2</sub> [MPa] </span>
        },
    },
    {
        field: "wydl",
        width: 245,
        headerClassName: "tableHeader",
        headerAlign: "center",
        align: "center",
        type: "number",
        editable: false,
        renderHeader: () => {
            return <span>Wydłużenie względne A<sub>10</sub> [%] </span>
        },
    },
    {
        field: "young",
        width: 200,
        headerClassName: "tableHeader",
        headerAlign: "center",
        align: "center",
        type: "number",
        editable: false,
        renderHeader: () => {
            return <span>Moduł Younga E [GPa]</span>
        },
    },
    {
        field: "twar",
        width: 150,
        headerClassName: "tableHeader",
        headerAlign: "center",
        align: "center",
        type: "number",
        editable: false,
        renderHeader: () => {
            return <span>Twardość</span>
        },
    },
    {
        field: "udar",
        width: 150,
        headerClassName: "tableHeader",
        headerAlign: "center",
        align: "center",
        type: "number",
        editable: false,
        renderHeader: () => {
            return <span>Udarność</span>
        },
    },
    {
        field: "data",
        headerName: "Data modyfikacji",
        headerAlign: "center",
        align: "center",
        headerClassName: "tableHeader",
        width: 150,
    },
];