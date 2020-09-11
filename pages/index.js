import Link from "next/link";
import cx from "classnames";
import Head from "../components/head";
import Header from "../components/Header";
import Nav from "../components/nav";

import styles from "./index.module.scss";

import { Client } from "../prismic-configuration.js";

const Home = ({ doc }) => {
  const pink = doc.data.header_color === "pink";
  console.log(JSON.stringify(doc));
  return (
    <div className={styles.Main}>
      <Header pink={pink} />
      <Head title="Home" />
      <div
        className={styles.FeatureStory}
        style={{
          backgroundImage: `url(${doc.data["feature-story-image"].url})`,
        }}
      >
        <div className={styles.FeatureWrapper}>
          <div className={styles.FeatureDetails}>
            <h1 className={styles.FeatureTitle}>
              {doc.data["feature-story-title"][0].text}
            </h1>
            <p>{doc.data["feature-story-description"][0].text}</p>
          </div>
        </div>
      </div>
      <div className={styles.FeatureStoryMobile}>
        <img
          className={styles.FeatureStoryMobileImage}
          src={doc.data["feature-story-image"].url}
          alt={doc.data["image-description"]}
        />
        <div className={styles.FeatureWrapper}>
          <div className={styles.FeatureStoryMobileDetails}>
            <h1 className={styles.FeatureTitle}>
              {doc.data["feature-story-title"][0].text}
            </h1>
            <p>{doc.data["feature-story-description"][0].text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async (ctx) => {
  const req = ctx.req;
  const home = await Client(req).getSingle("home-page");
  return {
    doc: home,
  };
};

export default Home;
