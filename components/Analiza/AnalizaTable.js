import { DataGrid } from "@mui/x-data-grid";
import classes from './AnalizaTable.module.css';

const columns = [
  { field: "wyt", headerName: "Nr wytopu", 
  headerClassName: 'tableHeader', headerAlign: 'center', align: 'center', width: 120 },
  {
    field: "gat",
    headerName: "Gatunek",
    headerClassName: 'tableHeader',headerAlign: 'center', align: 'center',
    width: 150,
    editable: true,
  },
  {
    field: "rodzMet",
    headerName: "Rodzaj metalu",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    width: 150,
    editable: true,
  },
  {
    field: "C",
    headerName: "C",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    type: "number",
    editable: true,
  },
  {
    field: "Si",
    headerName: "Si",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    type: "number",
    editable: true,
  },
  {
    field: "Mn",
    headerName: "Mn",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    type: "number",
    editable: true,
  },
  {
    field: "Mg",
    headerName: "Mg",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    type: "number",
    editable: true,
  },
  {
    field: "P",
    headerName: "P",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    type: "number",
    editable: true,
  },
  {
    field: "S",
    headerName: "S",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    type: "number",
    editable: true,
  },  
  {
    field: "Cu",
    headerName: "Cu",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    type: "number",
    editable: true,
  },
  {
    field: "Ce",
    headerName: "Ce",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    type: "number",
    editable: true,
  },
  {
    field: "La",
    headerName: "La",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    type: "number",
    editable: true,
  },
  {
    field: "Zr",
    headerName: "Zr",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    type: "number",
    editable: true,
  },
  {
    field: "Bi",
    headerName: "Bi",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    type: "number",
    editable: true,
  },
  {
    field: "Ca",
    headerName: "Ca",
    headerClassName: 'tableHeader', headerAlign: 'center', align: 'center',
    type: "number",
    editable: true,
  },
  {
    field: "data",
    headerName: "Data modyfikacji", headerAlign: 'center', align: 'center',
    headerClassName: 'tableHeader',
    width: 210,
  },
];

const rows = [{"id":1,"wyt":1,"gat":"GJS-600-3","rodzMet":"Żeliwo białe","C":31,"Si":27,"Mn":4,"Mg":47,"P":47,"S":92,"Cu":15,"Ce":43,"La":48,"Zr":19,"Bi":77,"Ca":10,"data":"27/6/2021"},
{"id":2,"wyt":2,"gat":"GJS-400-18","rodzMet":"Żeliwo ADI","C":69,"Si":36,"Mn":29,"Mg":27,"P":64,"S":45,"Cu":33,"Ce":80,"La":71,"Zr":21,"Bi":55,"Ca":67,"data":"26/11/2021"},
{"id":3,"wyt":3,"gat":"GJS-400-18","rodzMet":"Żeliwo białe","C":39,"Si":48,"Mn":89,"Mg":18,"P":2,"S":71,"Cu":14,"Ce":43,"La":53,"Zr":62,"Bi":49,"Ca":18,"data":"7/9/2021"},
{"id":4,"wyt":4,"gat":"GJS-400-18","rodzMet":"Żeliwo sferoidalne","C":38,"Si":10,"Mn":90,"Mg":17,"P":71,"S":15,"Cu":41,"Ce":99,"La":29,"Zr":20,"Bi":82,"Ca":18,"data":"5/4/2022"},
{"id":5,"wyt":5,"gat":"GJS-500-7","rodzMet":"Żeliwo ADI","C":94,"Si":38,"Mn":15,"Mg":1,"P":66,"S":63,"Cu":85,"Ce":73,"La":40,"Zr":16,"Bi":56,"Ca":91,"data":"1/11/2021"},
{"id":6,"wyt":6,"gat":"GJS-500-7","rodzMet":"Żeliwo ADI","C":91,"Si":83,"Mn":26,"Mg":25,"P":13,"S":79,"Cu":94,"Ce":17,"La":88,"Zr":100,"Bi":65,"Ca":17,"data":"30/1/2022"},
{"id":7,"wyt":7,"gat":"GJS-500-7","rodzMet":"Żeliwo szare","C":66,"Si":42,"Mn":1,"Mg":61,"P":23,"S":67,"Cu":19,"Ce":21,"La":48,"Zr":28,"Bi":99,"Ca":39,"data":"26/9/2021"},
{"id":8,"wyt":8,"gat":"GJS-600-3","rodzMet":"Żeliwo białe","C":31,"Si":83,"Mn":80,"Mg":17,"P":19,"S":85,"Cu":75,"Ce":8,"La":55,"Zr":87,"Bi":36,"Ca":31,"data":"30/10/2021"},
{"id":9,"wyt":9,"gat":"GJS-400-18","rodzMet":"Żeliwo sferoidalne","C":98,"Si":82,"Mn":66,"Mg":52,"P":28,"S":43,"Cu":61,"Ce":98,"La":36,"Zr":34,"Bi":42,"Ca":4,"data":"14/5/2021"},
{"id":10,"wyt":10,"gat":"GJS-600-3","rodzMet":"Żeliwo białe","C":98,"Si":8,"Mn":80,"Mg":3,"P":86,"S":26,"Cu":96,"Ce":51,"La":55,"Zr":87,"Bi":49,"Ca":28,"data":"19/9/2021"},
{"id":11,"wyt":11,"gat":"GJS-400-18 LT","rodzMet":"Żeliwo szare","C":98,"Si":100,"Mn":58,"Mg":19,"P":41,"S":99,"Cu":41,"Ce":62,"La":94,"Zr":89,"Bi":26,"Ca":8,"data":"11/3/2022"},
{"id":12,"wyt":12,"gat":"GJS-400-18","rodzMet":"Żeliwo sferoidalne","C":78,"Si":26,"Mn":41,"Mg":2,"P":97,"S":73,"Cu":71,"Ce":31,"La":87,"Zr":73,"Bi":35,"Ca":71,"data":"20/12/2021"},
{"id":13,"wyt":13,"gat":"GJS-500-7","rodzMet":"Żeliwo białe","C":12,"Si":7,"Mn":23,"Mg":24,"P":57,"S":65,"Cu":76,"Ce":98,"La":35,"Zr":19,"Bi":62,"Ca":13,"data":"11/11/2021"},
{"id":14,"wyt":14,"gat":"GJS-600-3","rodzMet":"Żeliwo sferoidalne","C":35,"Si":51,"Mn":50,"Mg":63,"P":83,"S":53,"Cu":37,"Ce":18,"La":27,"Zr":34,"Bi":32,"Ca":33,"data":"31/5/2021"},
{"id":15,"wyt":15,"gat":"GJS-500-7","rodzMet":"Żeliwo ADI","C":33,"Si":28,"Mn":55,"Mg":44,"P":37,"S":79,"Cu":87,"Ce":2,"La":77,"Zr":28,"Bi":54,"Ca":99,"data":"5/11/2021"},
{"id":16,"wyt":16,"gat":"GJS-400-18 LT","rodzMet":"Żeliwo szare","C":42,"Si":46,"Mn":37,"Mg":82,"P":91,"S":65,"Cu":23,"Ce":79,"La":74,"Zr":74,"Bi":69,"Ca":12,"data":"25/6/2021"},
{"id":17,"wyt":17,"gat":"GJS-400-18 LT","rodzMet":"Żeliwo sferoidalne","C":11,"Si":63,"Mn":33,"Mg":65,"P":75,"S":22,"Cu":75,"Ce":49,"La":17,"Zr":72,"Bi":88,"Ca":2,"data":"24/2/2022"},
{"id":18,"wyt":18,"gat":"GJS-400-18","rodzMet":"Żeliwo białe","C":11,"Si":20,"Mn":7,"Mg":63,"P":49,"S":1,"Cu":66,"Ce":80,"La":5,"Zr":49,"Bi":85,"Ca":56,"data":"6/9/2021"},
{"id":19,"wyt":19,"gat":"GJS-400-18","rodzMet":"Żeliwo białe","C":9,"Si":55,"Mn":72,"Mg":60,"P":31,"S":28,"Cu":77,"Ce":29,"La":24,"Zr":91,"Bi":17,"Ca":67,"data":"25/4/2021"},
{"id":20,"wyt":20,"gat":"GJS-400-18 LT","rodzMet":"Żeliwo ADI","C":11,"Si":91,"Mn":14,"Mg":46,"P":56,"S":68,"Cu":68,"Ce":74,"La":12,"Zr":92,"Bi":66,"Ca":51,"data":"3/10/2021"},
{"id":21,"wyt":21,"gat":"GJS-600-3","rodzMet":"Żeliwo ADI","C":37,"Si":6,"Mn":70,"Mg":20,"P":56,"S":97,"Cu":70,"Ce":93,"La":11,"Zr":71,"Bi":70,"Ca":43,"data":"29/5/2021"},
{"id":22,"wyt":22,"gat":"GJS-400-18","rodzMet":"Żeliwo ADI","C":5,"Si":6,"Mn":90,"Mg":81,"P":84,"S":2,"Cu":50,"Ce":71,"La":78,"Zr":20,"Bi":18,"Ca":65,"data":"1/1/2022"},
{"id":23,"wyt":23,"gat":"GJS-600-3","rodzMet":"Żeliwo sferoidalne","C":67,"Si":65,"Mn":15,"Mg":53,"P":98,"S":74,"Cu":23,"Ce":27,"La":26,"Zr":20,"Bi":34,"Ca":43,"data":"2/1/2022"},
{"id":24,"wyt":24,"gat":"GJS-600-3","rodzMet":"Żeliwo białe","C":27,"Si":60,"Mn":1,"Mg":45,"P":96,"S":75,"Cu":90,"Ce":61,"La":46,"Zr":13,"Bi":3,"Ca":32,"data":"1/1/2022"},
{"id":25,"wyt":25,"gat":"GJS-500-7","rodzMet":"Żeliwo sferoidalne","C":39,"Si":70,"Mn":59,"Mg":64,"P":32,"S":23,"Cu":89,"Ce":39,"La":12,"Zr":35,"Bi":36,"Ca":18,"data":"28/2/2022"},
{"id":26,"wyt":26,"gat":"GJS-600-3","rodzMet":"Żeliwo sferoidalne","C":28,"Si":51,"Mn":100,"Mg":64,"P":59,"S":37,"Cu":44,"Ce":96,"La":94,"Zr":7,"Bi":80,"Ca":78,"data":"3/2/2022"},
{"id":27,"wyt":27,"gat":"GJS-400-18","rodzMet":"Żeliwo sferoidalne","C":43,"Si":54,"Mn":13,"Mg":55,"P":55,"S":85,"Cu":67,"Ce":78,"La":69,"Zr":36,"Bi":14,"Ca":72,"data":"22/8/2021"},
{"id":28,"wyt":28,"gat":"GJS-600-3","rodzMet":"Żeliwo sferoidalne","C":76,"Si":51,"Mn":87,"Mg":45,"P":38,"S":69,"Cu":19,"Ce":49,"La":63,"Zr":88,"Bi":52,"Ca":46,"data":"2/6/2021"},
{"id":29,"wyt":29,"gat":"GJS-400-18 LT","rodzMet":"Żeliwo szare","C":56,"Si":63,"Mn":51,"Mg":84,"P":97,"S":44,"Cu":49,"Ce":12,"La":91,"Zr":36,"Bi":69,"Ca":99,"data":"27/9/2021"},
{"id":30,"wyt":30,"gat":"GJS-500-7","rodzMet":"Żeliwo ADI","C":62,"Si":92,"Mn":97,"Mg":53,"P":71,"S":83,"Cu":86,"Ce":5,"La":65,"Zr":56,"Bi":80,"Ca":40,"data":"26/12/2021"},
{"id":31,"wyt":31,"gat":"GJS-400-18","rodzMet":"Żeliwo białe","C":85,"Si":52,"Mn":20,"Mg":35,"P":75,"S":74,"Cu":65,"Ce":71,"La":35,"Zr":14,"Bi":32,"Ca":79,"data":"9/7/2021"},
{"id":32,"wyt":32,"gat":"GJS-400-18 LT","rodzMet":"Żeliwo ADI","C":17,"Si":80,"Mn":18,"Mg":26,"P":85,"S":32,"Cu":21,"Ce":11,"La":91,"Zr":93,"Bi":3,"Ca":56,"data":"28/7/2021"},
{"id":33,"wyt":33,"gat":"GJS-500-7","rodzMet":"Żeliwo sferoidalne","C":46,"Si":84,"Mn":59,"Mg":35,"P":62,"S":26,"Cu":53,"Ce":37,"La":58,"Zr":59,"Bi":49,"Ca":58,"data":"9/7/2021"},
{"id":34,"wyt":34,"gat":"GJS-400-18","rodzMet":"Żeliwo sferoidalne","C":76,"Si":22,"Mn":70,"Mg":65,"P":43,"S":28,"Cu":85,"Ce":38,"La":25,"Zr":1,"Bi":11,"Ca":79,"data":"15/3/2022"},
{"id":35,"wyt":35,"gat":"GJS-500-7","rodzMet":"Żeliwo ADI","C":92,"Si":47,"Mn":85,"Mg":99,"P":47,"S":64,"Cu":10,"Ce":98,"La":95,"Zr":19,"Bi":93,"Ca":23,"data":"10/4/2021"},
{"id":36,"wyt":36,"gat":"GJS-600-3","rodzMet":"Żeliwo sferoidalne","C":38,"Si":44,"Mn":35,"Mg":7,"P":93,"S":12,"Cu":89,"Ce":72,"La":87,"Zr":47,"Bi":62,"Ca":23,"data":"15/9/2021"},
{"id":37,"wyt":37,"gat":"GJS-400-18","rodzMet":"Żeliwo ADI","C":27,"Si":16,"Mn":72,"Mg":86,"P":39,"S":61,"Cu":59,"Ce":34,"La":32,"Zr":10,"Bi":43,"Ca":81,"data":"5/9/2021"},
{"id":38,"wyt":38,"gat":"GJS-500-7","rodzMet":"Żeliwo sferoidalne","C":54,"Si":91,"Mn":82,"Mg":98,"P":65,"S":15,"Cu":27,"Ce":54,"La":82,"Zr":46,"Bi":37,"Ca":27,"data":"4/3/2022"},
{"id":39,"wyt":39,"gat":"GJS-400-18","rodzMet":"Żeliwo szare","C":19,"Si":15,"Mn":68,"Mg":18,"P":42,"S":2,"Cu":55,"Ce":48,"La":11,"Zr":88,"Bi":32,"Ca":71,"data":"11/4/2022"},
{"id":40,"wyt":40,"gat":"GJS-500-7","rodzMet":"Żeliwo ADI","C":61,"Si":87,"Mn":40,"Mg":9,"P":57,"S":7,"Cu":14,"Ce":10,"La":64,"Zr":71,"Bi":78,"Ca":78,"data":"3/8/2021"},
{"id":41,"wyt":41,"gat":"GJS-400-18","rodzMet":"Żeliwo ADI","C":26,"Si":50,"Mn":41,"Mg":98,"P":5,"S":61,"Cu":64,"Ce":68,"La":34,"Zr":17,"Bi":15,"Ca":97,"data":"24/3/2022"},
{"id":42,"wyt":42,"gat":"GJS-400-18 LT","rodzMet":"Żeliwo białe","C":38,"Si":48,"Mn":75,"Mg":22,"P":93,"S":66,"Cu":7,"Ce":53,"La":30,"Zr":92,"Bi":42,"Ca":86,"data":"8/8/2021"},
{"id":43,"wyt":43,"gat":"GJS-500-7","rodzMet":"Żeliwo białe","C":100,"Si":56,"Mn":51,"Mg":70,"P":93,"S":13,"Cu":31,"Ce":15,"La":82,"Zr":79,"Bi":53,"Ca":67,"data":"13/9/2021"},
{"id":44,"wyt":44,"gat":"GJS-400-18","rodzMet":"Żeliwo białe","C":72,"Si":95,"Mn":90,"Mg":78,"P":73,"S":81,"Cu":69,"Ce":79,"La":37,"Zr":30,"Bi":56,"Ca":57,"data":"8/5/2021"},
{"id":45,"wyt":45,"gat":"GJS-400-18","rodzMet":"Żeliwo szare","C":1,"Si":8,"Mn":11,"Mg":54,"P":21,"S":14,"Cu":75,"Ce":15,"La":70,"Zr":31,"Bi":8,"Ca":44,"data":"5/4/2022"},
{"id":46,"wyt":46,"gat":"GJS-400-18 LT","rodzMet":"Żeliwo szare","C":74,"Si":77,"Mn":77,"Mg":20,"P":72,"S":56,"Cu":29,"Ce":76,"La":5,"Zr":71,"Bi":13,"Ca":52,"data":"2/4/2021"},
{"id":47,"wyt":47,"gat":"GJS-400-18","rodzMet":"Żeliwo białe","C":36,"Si":12,"Mn":81,"Mg":33,"P":96,"S":49,"Cu":72,"Ce":69,"La":45,"Zr":17,"Bi":2,"Ca":41,"data":"3/11/2021"},
{"id":48,"wyt":48,"gat":"GJS-500-7","rodzMet":"Żeliwo sferoidalne","C":83,"Si":4,"Mn":26,"Mg":62,"P":51,"S":13,"Cu":77,"Ce":94,"La":81,"Zr":74,"Bi":92,"Ca":8,"data":"28/6/2021"},
{"id":49,"wyt":49,"gat":"GJS-600-3","rodzMet":"Żeliwo ADI","C":28,"Si":13,"Mn":65,"Mg":54,"P":37,"S":6,"Cu":80,"Ce":67,"La":68,"Zr":5,"Bi":35,"Ca":55,"data":"2/12/2021"},
{"id":50,"wyt":50,"gat":"GJS-400-18 LT","rodzMet":"Żeliwo białe","C":94,"Si":21,"Mn":53,"Mg":81,"P":81,"S":15,"Cu":53,"Ce":82,"La":17,"Zr":9,"Bi":22,"Ca":44,"data":"30/6/2021"}];

function AnalizaTable() {
  return (
    <div className={classes.table} style={{ height: '910px', width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={15}
        rowsPerPageOptions={[15]}
        disableSelectionOnClick
        sx={{
            bgcolor: '#ebf5ff',
            boxShadow: 2,
            border: 1,
            borderRadius: '6px',
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            },
            '& .tableHeader': {
                backgroundColor: '#3399ff',
                color: '#fff',
              },
          }}
      />
    </div>
  );
}

export default AnalizaTable;
