import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import classes from "./StrukturaTable.module.css";
import { database, storage } from "../../config/firebase";
import { ref as sRef, deleteObject } from 'firebase/storage';
import "firebase/compat/storage";
import 'firebase/compat/database';
import { ref, onValue, remove } from "firebase/database";
import Button from "@mui/material/Button";
import Image from 'next/image';
import Modal from "../Modals/Modal";
import DeleteIcon from '../static/delete.png';
import DeleteIcon2 from '../static/delete2.png';
import ImgModal from "../Modals/ImgModal";

function StrukturaTable() {
  const [records, setRecords] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const db = database;

  const [showAddAlert, setAddShowAlert] = useState(false);

  const showAlert = () => {
    setAddShowAlert(prevState => !prevState);
  }

  const deleteRows = (e) => {
    e.preventDefault();
    setSelectedRows([]);
    selectionModel.forEach((element) => {
      const formatedElement = parseInt(element);
      console.log(formatedElement);
      const promise1 = remove(ref(db, "strukturaNext/" + formatedElement)).then(setSelectedRows(prevState => [...prevState, ' ' + formatedElement]));

      const deleteRef1 = sRef(storage, 'images/' + element + '_1');
      const promise2 = deleteObject(deleteRef1);
      const deleteRef2 = sRef(storage, 'images/' + element + '_2');
      const promise3 = deleteObject(deleteRef2);

      Promise.all([promise1, promise2, promise3]).then(() => {
        setAddShowAlert(true);
        setTimeout(() => setAddShowAlert(false), 3000);
      });
    });

  };
  const hideModal = () => {
    setShowModal(prevState => !prevState);
  }

  useEffect(() => {
    const getData = ref(db, "strukturaNext/");
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



  const columns = [
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
      field: "sfer",
      headerName: "Stopień sferoidalności grafitu [%]",
      width: 230,
      headerClassName: "tableHeader",
      headerAlign: "center",
      align: "center",
      type: "number",
      editable: false,
    },
    {
      field: "wydz",
      width: 225,
      headerClassName: "tableHeader",
      headerAlign: "center",
      align: "center",
      type: "number",
      editable: false,
      renderHeader: () => {
        return <span>Liczba wydzieleń grafitu [1/mm<sup>2</sup>]</span>
      },
    },
    {
      field: "graf",
      headerName: "Udział grafitu [%]",
      width: 130,
      headerClassName: "tableHeader",
      headerAlign: "center",
      align: "center",
      type: "number",
      editable: false,
    },
    {
      field: "perl",
      headerName: "Udział perlitu [%]",
      width: 130,
      headerClassName: "tableHeader",
      headerAlign: "center",
      align: "center",
      type: "number",
      editable: false,
    },
    {
      field: "fer",
      headerName: "Udział ferrytu [%]",
      width: 130,
      headerClassName: "tableHeader",
      headerAlign: "center",
      align: "center",
      type: "number",
      editable: false,
    },
    {
      field: "str1",
      headerName: "Struktura przed trawieniem",
      headerClassName: "tableHeader",
      headerAlign: "center",
      align: "center",
      width: 200,
      editable: false,
      renderCell: (imgUrl) => {
        const imageClick = (e) => {
          e.stopPropagation();
          setImgUrl(imgUrl.value);
          setShowModal(prevState => !prevState);
        }
        return (
          imgUrl.value !== null && imgUrl.value !== undefined &&
          <div className={classes.photo}>
            <Image onClick={imageClick} className={classes.struktura} width="160px" height="200" objectFit="contain" src={imgUrl.value} alt="" />
          </div>);
      }
    },
    {
      field: "str2",
      headerName: "Struktura po trawieniu",
      headerClassName: "tableHeader",
      headerAlign: "center",
      align: "center",
      width: 200,
      editable: false,
      renderCell: (imgUrl) => {
        const imageClick = (e) => {
          e.stopPropagation();
          setImgUrl(imgUrl.value);
          setShowModal(prevState => !prevState);
        }
        return (
          imgUrl.value !== null && imgUrl.value !== undefined &&
          <div className={classes.photo}>
            <Image onClick={imageClick} className={classes.struktura} width="160px" height="200" objectFit="contain" src={imgUrl.value} alt="" />
          </div>);
      }
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

  return (
    <div
      className={classes.table}
      style={{ margin: "0 auto", height: "910px", width: "100%" }}
    >
      {selectionModel.length >= 1 ? (
        <Button className={classes.deleteButton} onClick={deleteRows}><Image src={DeleteIcon2} width={23} height={23}alt='deleteicon' /><span>Usuń zaznaczone elementy</span></Button>
      ) : (
        ""
      )}
      {showModal && <ImgModal onClose={hideModal} src={imgUrl}></ImgModal>}
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid
            rows={records}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[15]}
            checkboxSelection
            rowHeight={100}
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

export default StrukturaTable;
