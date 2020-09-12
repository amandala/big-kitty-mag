import cx from "classnames";
import Link from "../components/Link";
import Head from "../components/head";
import { H1, Body } from "../components/Typography";

import styles from "./index.module.scss";

import { Client } from "../prismic-configuration.js";

const Home = (props) => {
  console.log(JSON.stringify(props));
  return (
    <div className={styles.Main}>
      <Head title="Home" />
      <div
        className={styles.FeatureStory}
        style={{
          backgroundImage: `url(${props.data["feature-story-image"].url})`,
        }}
      >
        <Link href={`/stories/${props.data.feature_story.uid}`}>
          <div className={styles.FeatureWrapper}>
            <div className={styles.FeatureDetails}>
              <h4 className={styles.FeatureStoryHeading}>Feature Story</h4>
              <H1 className={styles.FeatureTitle}>
                {props.data.feature_story.data.title}
              </H1>
              <Body className={styles.Preview}>
                {props.data.feature_story.data.preview[0].text}
              </Body>
            </div>
          </div>
          <div className={styles.FeatureStoryMobile}>
            <img
              className={styles.FeatureStoryMobileImage}
              src={props.data["feature-story-image"].url}
              alt={props.data["image-description"]}
            />
            <div className={styles.FeatureStoryMobileDetails}>
              <h4 className={styles.FeatureStoryHeading}>Feature Story</h4>
              <h1 className={styles.FeatureTitle}>
                {props.data.feature_story.data.title}
              </h1>
              <p>{props.data.feature_story.data.preview[0].text}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export async function getStaticProps(ctx) {
  const req = ctx.req;
  const home = await Client(req).getSingle("home-page", {
    fetchLinks: ["article.title", "article.preview"],
  });
  return {
    props: home,
  };
}

export default Home;
