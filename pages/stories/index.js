import { H1, H2, BodySmall, Meta } from "../../components/Typography";
import Link from "next/link";
import Prismic from "prismic-javascript";
import Header from "../../components/Header";
import styles from "./index.module.scss";
import { Client } from "../../prismic-configuration.js";

const Stories = (props) => {
  return (
    <div className={styles.Page}>
      <Header pink />
      <div className={styles.Banner}>
        <div className={styles.Heading}>
          <H1 className={styles.Header}>
            Purr-ruse stories covering Calgary's Underground Arts, Music &
            Culture
          </H1>
        </div>
      </div>
      {props.results.map((story) => {
        console.log(story);
        return (
          <Link href={`/stories/${story.uid}`}>
            <main className={styles.StoryWrapper}>
              <div className={styles.StoryDetails}>
                <div className={styles.Preview}>
                  <H2>{story.data.title}</H2>
                  {story.data.story.slice(0, 2).map((chunk) => {
                    console.log(chunk);
                    return <BodySmall>{chunk.text}</BodySmall>;
                  })}
                </div>
                <Meta className={styles.ReadMore}> Keep Reading</Meta>
              </div>
              <div className={styles.ImageWrapper}>
                <img
                  className={styles.StoryPhoto}
                  src={story.data.main_photo.url}
                />
              </div>
            </main>
          </Link>
        );
      })}
    </div>
  );
};

export async function getServerSideProps(ctx) {
  const req = ctx.req;

  const home = await Client(req)
    .query(Prismic.Predicates.at("document.type", "article"), {})
    .then(function (response) {
      return response;
      // response is the response object, response.results holds the documents
    });
  return {
    props: home,
  };
}

export default Stories;
