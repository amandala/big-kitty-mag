import React from "react";
import { Client } from "../../prismic-configuration.js";

import {
  H1,
  H2,
  Body,
  BodySmall,
  BodyExtraSmall,
  H4,
} from "../../components/Typography";
import Header from "../../components/Header";
import Head from "../../components/Head";
import styles from "./index.module.scss";

const About = ({ about }) => {
  console.log(about);
  return (
    <div className={styles.Page}>
      <Head title="About Big Kitty Magazine" />
      <Header pink={true} />
      <div className={styles.Wrapper}>
        <H1 className={styles.Title}>Welcome to Big Kitty Mag Online</H1>
        <div className={styles.Section}>
          <BodyExtraSmall className={styles.SectionHeading}>
            A note from Jennie
          </BodyExtraSmall>
          <H2 className={styles.Hello}>Hello!</H2>
          <Body>{about.data.editors_note[0].text}</Body>
          <H4 className={styles.Jennie}>
            - Jennie Big Kitty, Publisher & Editor-in-Chief
          </H4>
        </div>
        <div className={styles.Section}>
          <BodyExtraSmall className={styles.SectionHeading}>
            Land Acknowledgement
          </BodyExtraSmall>
          {about.data["land-acknowledgement"].map((para) => (
            <Body>{para.text}</Body>
          ))}
        </div>
        <div className={styles.Section}>
          <BodyExtraSmall className={styles.SectionHeading}>
            Contact Big Kitty
          </BodyExtraSmall>
          <Body>
            Looking to get involved in Big Kitty Magazine? We're always looking
            to add passionate people to the crew!
          </Body>
          <Body>
            Send Jennie an email at{" "}
            <a
              className={styles.InlineLink}
              href="mailto:jennie@bigkittymag.com"
            >
              jennie@bigkittymag.com
            </a>
            .
          </Body>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const req = ctx.req;
  const about = await Client(req).getSingle("about-page", {});

  return {
    props: { about },
  };
}

export default About;
