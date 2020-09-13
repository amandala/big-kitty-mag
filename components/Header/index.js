import React from "react";
import cx from "classnames";
import Link from "next/link";
import { H2 } from "../../components/Typography";
import styles from "./index.module.scss";

const Header = ({ pink }) => {
  return (
    <header className={cx(styles.Header, { [styles.HeaderBlack]: !pink })}>
      <div className={styles.HeaderContent}>
        <Link href="/">
          <img
            className={styles.Logo}
            src={pink ? "/BKMagLogo.PNG" : "/BKMagLogo_Pink.PNG"}
            alt="Big Kitty Logo"
          />
        </Link>
        <div>
          <Link href="/stories">
            <span className={styles.NavLink}>Stories</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
