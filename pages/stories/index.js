import { H1, H2, Body, Meta } from "../../components/Typography";
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
            Purr-ruse stories covering Calgary's Underground Arts & Culture
            scene
          </H1>
        </div>
      </div>
      {props.results.map((story) => {
        console.log(story);
        return (
          <Link href={`/stories/${story.uid}`}>
            <main className={styles.StoryWrapper}>
              <div className={styles.StoryDetails}>
                <div>
                  <H2>{story.data.title}</H2>
                  <Body className={styles.Preview}>
                    {story.data.story.slice(0, 2).map((chunk) => {
                      console.log(chunk);
                      return <Body>{chunk.text}</Body>;
                    })}
                  </Body>
                </div>
                <Meta className={styles.ReadMore}> Keep Reading</Meta>
              </div>

              <img
                className={styles.StoryPhoto}
                src={story.data.main_photo.url}
              />
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
