import React from "react";
import cx from "classnames";

import styles from "./index.module.scss";

export const H1 = ({ children, className }) => (
  <h1 className={cx(styles.H1, className)}>{children}</h1>
);

export const H2 = ({ children, className }) => (
  <h2 className={cx(styles.H2, className)}>{children}</h2>
);

export const H3 = ({ children, className }) => (
  <h3 className={cx(styles.H3, className)}>{children}</h3>
);

export const H4 = ({ children, className }) => (
  <h4 className={cx(styles.H4, className)}>{children}</h4>
);

export const H5 = ({ children, className }) => (
  <h5 className={cx(styles.H5, className)}>{children}</h5>
);

export const H6 = ({ children, className }) => (
  <h6 className={cx(styles.H6, className)}>{children}</h6>
);

export const Body = ({ children, className }) => (
  <p className={cx(styles.Body, className)}>{children}</p>
);

export const BodySmall = ({ children, className }) => (
  <p className={cx(styles.BodySmall, className)}>{children}</p>
);

export const BodyExtraSmall = ({ children, className }) => (
  <p className={cx(styles.BodyExtraSmall, className)}>{children}</p>
);

export const Meta = ({ children, className }) => (
  <strong className={cx(styles.Meta, className)}>{children}</strong>
);
