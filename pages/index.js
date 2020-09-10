import Link from "next/link";
import Head from "../components/head";
import Nav from "../components/nav";

import styles from "./index.module.scss";

export default () => (
  <div className={styles.Main}>
    <Head title="Home" />
    <img className={styles.Logo} src="./BKMagLogo_Pink.PNG" />
    <h1 className={styles.ComingSoon}>Coming Soon</h1>
  </div>
);
