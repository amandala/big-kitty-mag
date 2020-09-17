import Link from "next/link";
import Prismic from "prismic-javascript";
import cx from "classnames";
import Head from "../components/head";
import Header from "../components/Header";
import Nav from "../components/nav";
import { H1, Body } from "../components/Typography";
import StoriesList from "../components/StoriesList";
import styles from "./index.module.scss";

import { Client } from "../prismic-configuration.js";

const Home = ({ home, stories }) => {
  return (
    <div className={styles.Main}>
      <Head title="Home" />
      <Header pink={home.data.header_color === "pink"} />
      <div
        className={styles.FeatureStory}
        style={{
          backgroundImage: `url(${home.data["feature-story-image"].url})`,
        }}
      >
        <Link href={`/stories/${home.data.feature_story.uid}`}>
          <div className={styles.FeatureWrapper}>
            <div className={styles.FeatureDetails}>
              <h4 className={styles.FeatureStoryHeading}>Feature Story</h4>
              <H1 className={styles.FeatureTitle}>
                {home.data.feature_story.data.title}
              </H1>
              <Body className={styles.Preview}>
                {home.data.feature_story.data.preview[0].text}
              </Body>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.FeatureStoryMobile}>
        <Link href={`/stories/${home.data.feature_story.uid}`}>
          <div className={styles.HoverWrapper}>
            <img
              className={styles.FeatureStoryMobileImage}
              src={home.data["feature-story-image"].url}
              alt={home.data["image-description"]}
            />

            <div className={styles.FeatureStoryMobileDetails}>
              <h4 className={styles.FeatureStoryHeading}>Feature Story</h4>
              <H1 className={styles.FeatureTitle}>
                {home.data.feature_story.data.title}
              </H1>
              <Body className={styles.Preview}>
                {home.data.feature_story.data.preview[0].text}
              </Body>
            </div>
          </div>
        </Link>
      </div>
      <StoriesList stories={stories} />
    </div>
  );
};

export async function getStaticProps(ctx) {
  const req = ctx.req;
  const home = await Client(req).getSingle("home-page", {
    fetchLinks: ["article.title", "article.preview"],
  });

  const stories = await Client(req)
    .query(Prismic.Predicates.at("document.type", "article"), {
      orderings: "[my.article.released desc]",
    })
    .then(function (response) {
      return response;
      // response is the response object, response.results holds the documents
    });

  return {
    props: { home, stories },
  };
}

export default Home;
