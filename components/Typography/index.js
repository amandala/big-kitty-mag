import React from "react";
import classNames from "classnames";

import styles from "./index.module.scss";

const classes = ({ className, style }) => classNames(style, className);

export const H1 = ({ children, className }) => (
  <h1 className={classes({ className, style: styles.H1 })}>{children}</h1>
);

export const H2 = ({ children, className }) => (
  <h2 className={classes({ className, style: styles.H2 })}>{children}</h2>
);

export const H3 = ({ children, className }) => (
  <h3 className={classes({ className, style: styles.H3 })}>{children}</h3>
);

export const H4 = ({ children, className }) => (
  <h4 className={classes({ className, style: styles.H4 })}>{children}</h4>
);

export const H5 = ({ children, className }) => (
  <h5 className={classes({ className, style: styles.H5 })}>{children}</h5>
);

export const H6 = ({ children, className }) => (
  <h6 className={classes({ className, style: styles.H6 })}>{children}</h6>
);

export const Body = ({ children, className }) => (
  <p className={classes({ className, style: styles.Body })}>{children}</p>
);

export const BodySmall = ({ children, className }) => (
  <p className={classes({ className, style: styles.BodySmall })}>{children}</p>
);

export const BodyExtraSmall = ({ children, className }) => (
  <p className={classes({ className, style: styles.BodyExtraSmall })}>
    {children}
  </p>
);

export const Meta = ({ children, className }) => (
  <strong className={classes({ className, style: styles.Meta })}>
    {children}
  </strong>
);
