import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import classes from "./StrukturaTable.module.css";
import { database, storage } from "../../config/firebase";
import { ref as sRef, getDownloadURL, deleteObject} from 'firebase/storage';
import "firebase/compat/storage";
import 'firebase/compat/database';
import { ref, onValue, remove } from "firebase/database";
import Button from "@mui/material/Button";
import Image from 'next/image'

function StrukturaTable() {
  const [records, setRecords] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [images, setImages] = useState([]);
  const db = database;

  const deleteRows = (e) => {
    e.preventDefault();
    selectionModel.forEach((element) => {
      const formatedElement = parseInt(element);
      console.log(formatedElement);
      remove(ref(db, "strukturaNext/" + formatedElement)).then(
        console.log("Usunieto wiersz: " + selectionModel)
      );
      const deleteRef1 = sRef(storage, 'images/'+element+'_1');
      deleteObject(deleteRef1).then(() => {
        console.log(' pomyslnie usunieto');
      });
      const deleteRef2 = sRef(storage, 'images/'+element+'_2');
      deleteObject(deleteRef2).then(() => {
        console.log(' pomyslnie usunieto');
      });
    });
    
  };
  
  const fetchImages = async () => {
    const imagesRef = sRef(storage, 'images/1111_1.jpeg');
    getDownloadURL(sRef(storage, 'images/1111_1.jpeg')).then(url => {
      console.log(url)
    });
    console.log(imagesRef);
    // await storage.ref().child('images/').listAll().then(setImages([]))
    //   .then((res) => {
    //     res.items.forEach((item) => {
    //       item.getDownloadURL().then((url) => {
    //         setImages((arr) => [...arr, url]);
    //       });
    //     });
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //   });
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
    fetchImages();
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
      width: 120,
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
        console.log(imgUrl.value);
        return (
          imgUrl.value !== null && imgUrl.value !== undefined &&<Image className={classes.struktura} width="150px" height="100" objectFit="contain"  src={imgUrl.value} alt="" />
        );
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
        console.log(imgUrl.value);
        return (
          imgUrl.value !== null && imgUrl.value !== undefined && <Image className={classes.struktura} width="150px" height="100" objectFit="contain" src={imgUrl.value} alt="" />
        );
      }
    },
    {
      field: "data",
      headerName: "Data modyfikacji",
      headerAlign: "center",
      align: "center",
      headerClassName: "tableHeader",
      width: 210,
    },
  ];

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
    </div>
  );
}

export default StrukturaTable;
