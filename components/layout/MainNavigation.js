import Link from "next/link";
import Image from "next/image";
import classes from "./MainNavigation.module.css";
import logo from "./static/logo.png";

function MainNavigation() {
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
          <li>
            <Link href="/">Strona główna</Link>
          </li>
          <li>
            <Link href="/analiza">Analiza składu chemicznego</Link>
          </li>
          <li>
            <Link href="/">Struktura</Link>
          </li>
          <li>
            <Link href="/">Właściwości mechaniczne</Link>
          </li>
        </ul>
      </nav>
      <div className={classes.podsumowanie}>
        <Link href="/">Podsumowanie</Link>
      </div>
    </header>
  );
}

export default MainNavigation;
