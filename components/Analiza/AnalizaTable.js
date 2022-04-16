import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import classes from "./AnalizaTable.module.css";
import { columns } from "./Columns";
import { database } from "../../config/firebase";
import { ref, onValue, remove } from "firebase/database";
import Button from "@mui/material/Button";

function AnalizaTable() {
  const [records, setRecords] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const db = database;

  const deleteRows = (e) => {
    e.preventDefault();
    selectionModel.forEach((element) => {
      const formatedElement = parseInt(element) - 1;
      remove(ref(db, "analizaNext/" + formatedElement)).then(
        console.log("Usunieto wiersz: " + selectionModel)
      );
    });
  };

  useEffect(() => {
    const getData = ref(db, "analizaNext/");
    onValue(getData, (snapshot) => {
      const data = snapshot.val();
      let dataArray = Object.entries(data);
      let formatedArray = [];
      dataArray.map((item) => {
        formatedArray.push(item[1]);
      });
      setRecords(formatedArray);
    });
  }, []);

  return (
    <div
      className={classes.table}
      style={{ margin: "0 auto", height: "910px", width: "100%" }}
    >
      {selectionModel.length >= 1 ? (
        <Button onClick={deleteRows}>Usuń zaznaczone elementy</Button>
      ) : (
        ""
      )}
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={records}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[15]}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              console.log(newSelectionModel);
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
            sx={{
              bgcolor: "#ebf5ff",
              boxShadow: 2,
              border: 1,
              borderRadius: "6px",
              borderColor: "primary.light",
              "& .MuiDataGrid-cell:hover": {
                color: "primary.main",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3399ff",
              },
              "& .tableHeader": {
                backgroundColor: "#3399ff",
                color: "#fff",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default AnalizaTable;
