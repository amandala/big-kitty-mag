import React from "react";
import cx from "classnames";
import styles from "./index.module.scss";

const Header = ({ pink }) => {
  return (
    <header className={cx(styles.Header, { [styles.HeaderBlack]: !pink })}>
      <div className={styles.HeaderContent}>
        <img
          className={styles.Logo}
          src={pink ? "/BKMagLogo.PNG" : "/BKMagLogo_Pink.PNG"}
          alt="Big Kitty Logo"
        />
      </div>
    </header>
  );
};

export default Header;
