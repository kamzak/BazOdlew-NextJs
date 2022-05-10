import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import classes from "./MechTable.module.css";
import { columns } from './Columns';
import { database } from "../../config/firebase";
import { ref, onValue, remove, set } from "firebase/database";
import Button from "@mui/material/Button";
import Image from 'next/image';
import Modal from "../Modals/Modal";
import DeleteIcon from '../static/delete.png';
import DeleteIcon2 from '../static/delete2.png';

function MechTable() {
  const [records, setRecords] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const [showAddAlert, setAddShowAlert] = useState(false);

  const showAlert = () => {
    setAddShowAlert(prevState => !prevState);
  }
  const db = database;

  const deleteRows = (e) => {
    e.preventDefault();
    setSelectedRows([]);
    selectionModel.forEach((element) => {
      const formatedElement = parseInt(element);
      console.log(formatedElement);
      remove(ref(db, "mechNext/" + formatedElement)).then(setSelectedRows(prevState => [...prevState, ' ' + formatedElement]));
    });
    setAddShowAlert(true);
    setTimeout(() => setAddShowAlert(false), 3000);
  };

  useEffect(() => {
    const getData = ref(db, "mechNext/");
    onValue(getData, (snapshot) => {
      const data = snapshot.val();
      let dataArray = data && Object.entries(data);
      let formatedArray = [];
      dataArray && dataArray.map((item) => {
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
        <Button className={classes.deleteButton} onClick={deleteRows}><Image src={DeleteIcon2} width={23} height={23} alt='deleteicon' /><span>Usuń zaznaczone elementy</span></Button>
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
      {showAddAlert && selectedRows.length >= 1 && (
        <Modal className={classes.deletedModal} src={DeleteIcon} onClose={showAlert}>
          {`Usunieto wiersz(e) o nr wytopu: `}
          <span>{selectedRows.toString()}</span>
        </Modal>
      )}
    </div>
  );
}

export default MechTable;