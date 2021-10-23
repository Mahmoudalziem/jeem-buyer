import React, { useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  tab: {
    fontSize: 18,
  },
}));

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    "aria-controls": `wrapped-tabpanel-${index}`,
  };
}

const NavBar = (props) => {

  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event, value) => {
    setSelectedTab(value);
    props.handleChange(value);
  };

  return (
    <AppBar position="static" elevation={10}>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="#fff"
        variant="fullWidth"
        centered
      >
        {props.tabs.map((data, index) => (
          <Tab
            className={classes.tab}
            label={data}
            value={index}
            {...a11yProps(index)}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default NavBar;
