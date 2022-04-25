import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import classes from "./MainNavigation.module.css";
import logo from "../static/logo.png";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/router";
import SideMenu from "./SideMenu";

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";

function MainNavigation() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className={classes.header}>
      <div>
        <Image
          className={classes.logo}
          width={32}
          height={35}
          alt="logo"
          layout="fixed"
          src={logo}
        />
        <span className={classes.logoName}>BazOdlew</span>
      </div>
      <nav className={classes.nav}>
        <ul>
          <li className={classes.dropdownMenu}>
            <Button>
            <Link href="/">Strona główna</Link>
            </Button>
            </li>
          {user ? (
            <>
              <li className={classes.dropdownMenu}>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                >
                  Badania
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href="/analiza">Analiza składu chemicznego</Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <Link href="/">Struktura</Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <Link href="/">Właściwości mechaniczne</Link>
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClose}>
                    <Link href="/">Podsumowanie</Link>
                  </MenuItem>
                </Menu>
              </li>
            </>
          ) : null}
          {!user ? (
            <li className={classes.dropdownMenu}>
              <Button>
              <Link href="/login">Zaloguj się</Link>
              </Button>
            </li>
          ) : (
            <li
            className={classes.dropdownMenu}
              onClick={() => {
                logout();
                router.push("/");
              }}
            >
              <Button>
              Wyloguj się
              </Button>
            </li>
          )}
        </ul>
      </nav>
      <SideMenu />
    </header>
  );
}

export default MainNavigation;
