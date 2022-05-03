import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AnalizaForm from "./AnalizaForm";
import AnalizaTable from "./AnalizaTable";


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Analiza() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Fragment>
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            borderRadius: "5px 5px 0 0",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab
              label="Dodaj wyniki"
              {...a11yProps(0)}
              sx={{
                background: "rgba(29,43,50, 0.5)",
                color: 'white',
                borderRadius: "5px 0 0 0",
                "&.Mui-selected": {
                  background: "rgba(29,43,50, 0.8)",
                  color: 'white',
                  borderRadius: "5px 0px 0 0",
                },
              }}
            />
            <Tab
              label="Przeglądaj wyniki"
              {...a11yProps(1)}
              sx={{
                background: "rgba(29,43,50, 0.5)",
                color: 'white',
                borderRadius: "0 5px 0 0",
                "&.Mui-selected": {
                  background: "rgba(29,43,50, 0.8)",
                  color: 'white',
                  borderRadius: "0 5px 0 0",
                },
              }}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <AnalizaForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <AnalizaTable />
        </TabPanel>
      </Box>
    </Fragment>
  );
}

export default Analiza;
