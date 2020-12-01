import React from "react";
import cx from "classnames";
import MailchimpSignup from "./MailchimpSignup";
import { H3, BodySmall, BodyExtraSmall } from "../../components/Typography";
import styles from "./index.module.scss";

const Footer = () => {
  const [value, setValue] = React.useState();
  return (
    <div className={styles.Wrapper}>
      <div className={styles.Left}>
        <a
          href="https://prismic-io.s3.amazonaws.com/big-kitty-mag/01e3909e-80a8-4a26-8536-4e0f08e99e2a_BK-MediaKit-web.pdf"
          className={styles.Advertise}
          target="_blank"
        >
          <H3>Advertise in Big Kitty Mag</H3>
          <BodySmall className={styles.Cta}>
            Click to download our rate pack
          </BodySmall>
        </a>
        <a
          className={cx(styles.Link, styles.Cta)}
          href="http://www.portad.ca"
          target="_blank"
        >
          Site made with ♡ by Amanda
        </a>
      </div>
      <div className={styles.Right}>
        <H3>Stay In Touch</H3>
        <BodySmall className={styles.Cta}>
          Leave your email for meowvelous updates and special events
        </BodySmall>
        <MailchimpSignup />
      </div>
    </div>
  );
};

export default Footer;
