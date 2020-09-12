import Link from "next/link";
import cx from "classnames";
import Head from "../components/head";
import Nav from "../components/nav";
import { H1, Body } from "../components/Typography";

import styles from "./index.module.scss";

import { Client } from "../prismic-configuration.js";

const Home = ({ doc }) => {
  console.log(JSON.stringify(doc));
  return (
    <div className={styles.Main}>
      <Head title="Home" />
      <div
        className={styles.FeatureStory}
        style={{
          backgroundImage: `url(${doc.data["feature-story-image"].url})`,
        }}
      >
        <Link href={`/stories/${doc.data.feature_story.uid}`}>
          <div className={styles.FeatureWrapper}>
            <div className={styles.FeatureDetails}>
              <h4 className={styles.FeatureStoryHeading}>Feature Story</h4>
              <H1 className={styles.FeatureTitle}>
                {doc.data.feature_story.data.title}
              </H1>
              <Body className={styles.Preview}>
                {doc.data.feature_story.data.preview[0].text}
              </Body>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.FeatureStoryMobile}>
        <img
          className={styles.FeatureStoryMobileImage}
          src={doc.data["feature-story-image"].url}
          alt={doc.data["image-description"]}
        />

        <div className={styles.FeatureStoryMobileDetails}>
          <h1 className={styles.FeatureTitle}>
            {doc.data["feature-story-title"][0].text}
          </h1>
          <p>{doc.data["feature-story-description"][0].text}</p>
        </div>
      </div>
    </div>
  );
};

Home.getStaticProps = async (ctx) => {
  const req = ctx.req;
  const home = await Client(req).getSingle("home-page", {
    fetchLinks: ["article.title", "article.preview"],
  });
  return {
    doc: home,
  };
};

export default Home;
