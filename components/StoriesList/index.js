import { H1, H2, BodySmall, Meta } from "../Typography";
import Link from "next/link";
import Header from "../Header";
import styles from "./index.module.scss";

const StoriesList = ({ stories }) => {
  return (
    <div className={styles.Page}>
      {stories.results.map((story) => {
        return (
          <Link href={`/stories/${story.uid}`}>
            <main className={styles.StoryWrapper}>
              <div className={styles.StoryDetails}>
                <div className={styles.Preview}>
                  <H2>{story.data.title}</H2>
                  <BodySmall> {story.data.preview[0].text}</BodySmall>
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

export default StoriesList;
