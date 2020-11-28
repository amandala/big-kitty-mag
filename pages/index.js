import Link from "next/link";
import cx from "classnames";
import Prismic from "prismic-javascript";
import Head from "../components/head";
import Header from "../components/Header";
import Nav from "../components/nav";
import { H1, Body } from "../components/Typography";
import StoriesList from "../components/StoriesList";
import styles from "./index.module.scss";

import { Client } from "../prismic-configuration.js";

const Home = ({ home, stories, ads, tags }) => {
  const [activeFilter, setActiveFilter] = React.useState();
  console.log({ home });

  return (
    <div className={styles.Main}>
      <Head title="Home" />
      <Header pink={home.data.header_color === "pink"} />
      <div
        className={styles.FeatureStory}
        style={{
          backgroundImage: `url(${home.data.feature_story.data.main_photo.url})`,
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
                {home.data.feature_story.data.deck}
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
              src={home.data.feature_story.data.main_photo.url}
              alt={home.data.feature_story.data.main_photo.alt}
            />

            <div className={styles.FeatureStoryMobileDetails}>
              <h4 className={styles.FeatureStoryHeading}>Feature Story</h4>
              <H1 className={styles.FeatureTitle}>
                {home.data.feature_story.data.title}
              </H1>
              <Body className={styles.Preview}>
                {home.data.feature_story.data.deck}
              </Body>
            </div>
          </div>
        </Link>
      </div>
      <div className={styles.Banner}>
        <div className={styles.Heading}>
          <H1 className={styles.Header}>
            Purr-ruse stories covering Calgary's Underground Arts, Music, &
            Culture.
          </H1>
        </div>
        <div className={styles.TagWrapper}>
          <div className={styles.Tags}>
            <button
              onClick={() => setActiveFilter(undefined)}
              className={cx(styles.Tag, {
                [styles.TagActive]: !activeFilter,
              })}
              style={{
                backgroundColor: "#d60080",
              }}
            >
              All
            </button>
            {tags.results.map((tag) => {
              return (
                <button
                  onClick={() => setActiveFilter(tag.data.title)}
                  className={cx(styles.Tag, {
                    [styles.TagActive]: activeFilter === tag.data.title,
                  })}
                  style={{
                    backgroundColor: tag.data.color,
                  }}
                >
                  {tag.data.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <StoriesList stories={stories} activeFilter={activeFilter} />
      {ads.results.map((ad) => {
        return (
          <div className={styles.AdWrapper}>
            <img className={styles.Ad} src={ad.data.ad.url} />
          </div>
        );
      })}
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const req = ctx.req;
  const home = await Client(req).getSingle("home-page", {
    fetchLinks: ["article.title", "article.deck", "article.main_photo"],
  });

  const tags = await Client(req)
    .query(Prismic.Predicates.at("document.type", "tag"), {})
    .then(function (response) {
      return response;
      // response is the response object, response.results holds the documents
    });

  const ads = await Client(req)
    .query(Prismic.Predicates.at("document.type", "advertisement"), {
      fetchLinks: ["advertisement.ad"],
    })
    .then(function (response) {
      return response;
      // response is the response object, response.results holds the documents
    });

  const stories = await Client(req)
    .query(Prismic.Predicates.at("document.type", "article"), {
      orderings: "[my.article.released desc]",
      fetchLinks: ["tag.title", "tag.color"],
    })
    .then(function (response) {
      return response;
      // response is the response object, response.results holds the documents
    });

  return {
    props: { home, stories, ads, tags },
  };
}

export default Home;
