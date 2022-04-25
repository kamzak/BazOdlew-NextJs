import { useState } from "react";
import { Fragment } from 'react';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Box from "@mui/material/Box";
import classes from "./SideMenu.module.css";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

const SideMenu = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenMenu((prevState) => !prevState);
  };

  const listMenu = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {!user
          ? [
              <Link href="/">Strona główna</Link>,
              <Link href="/login">Zaloguj się</Link>,
            ].map((text, index) => (<Fragment key={index}>
              <ListItem button key={index}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              <Divider />
              </Fragment>
            ))
          : [
              <Link href="/">Strona główna</Link>,
              <li
                className={classes.wyloguj}
                onClick={() => {
                  logout();
                  router.push("/");
                }}
                key="m1"
              >
                Wyloguj się
              </li>
            ].map((text, index) => (<Fragment key={index}>
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              </Fragment> ))}
      </List>
      <List>
        {user
          ? [
              <Link href="/analiza">Analiza składu chemicznego</Link>,
              <Link href="/">Struktura</Link>,
              <Link href="/">Właściwości mechaniczne</Link>,
              <Link href="/">Podsumowanie</Link>,
            ].map((text, index) => (<Fragment key={index}>
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
              <Divider />
              </Fragment>
            ))
          : null}
      </List>
    </Box>
  );
  return (
    <div className={classes.sideMenu}>
      <div onClick={toggleDrawer} className={classes.hamburger}>
        &#9776;
      </div>
      <Drawer anchor="left" open={openMenu} onClose={toggleDrawer}>
        {listMenu("left")}
      </Drawer>
    </div>
  );
};

export default SideMenu;
