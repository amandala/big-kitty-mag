import Link from "next/link";
import cx from "classnames";
import Prismic from "prismic-javascript";
import Head from "../components/Head";
import Header from "../components/Header";
import Nav from "../components/nav";
import { H1, Body, Meta } from "../components/Typography";
import StoriesList from "../components/StoriesList";
import styles from "./index.module.scss";

import { Client } from "../prismic-configuration.js";

const Home = ({ home, stories, ads, tags }) => {
  const [activeFilter, setActiveFilter] = React.useState();
  const [searchTerm, setSearchTerm] = React.useState();

  return (
    <div className={styles.Main}>
      <Head title="Home" >
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Header pink={home.data.header_color === "pink"} />
      <div
        className={styles.FeatureStory}
        style={{
          backgroundImage: `url(${home.data.feature_story.data.main_photo?.url})`,
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
              {/* <Meta> {home.data.feature_story.data.author.name}</Meta> */}
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
          <H1 className={styles.Header}>{`Viewing: ${
            activeFilter ? activeFilter : "All"
          } Stories`}</H1>
          <div className={styles.SearchBox}>
            
            <input className={styles.Search} value={searchTerm} onChange={(d) => setSearchTerm(d.target.value)} />
            <img className={styles.SearchIcon} src="/searchIcon.svg" />
          </div>
        </div>
        <div className={styles.TagWrapper}>
          <div className={styles.Tags}>
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
          <div className={styles.AllStoriesWrapper}>
            <button
              onClick={() => setActiveFilter(undefined)}
              className={cx(styles.AllStories, {
                [styles.AllStoriesActive]: !activeFilter,
              })}
            >
              View All Stories
            </button>
          </div>
        </div>
      </div>
      <StoriesList
        stories={stories}
        activeFilter={activeFilter}
        ads={ads.results}
        searchTerm={searchTerm}
      />
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
      orderings: "[document.last_publication_date desc]",
    })
    .then(function (response) {
      return response;
      // response is the response object, response.results holds the documents
    });

  const stories = await Client(req)
    .query(Prismic.Predicates.at("document.type", "article"), {
      pageSize: 100,
      orderings: "[my.article.released desc]",
      fetchLinks: [
        "tag.title",
        "tag.color",
        "link.display_text",
        "link.link",
        "author.name",
      ],
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
