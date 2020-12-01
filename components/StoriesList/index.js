import { H1, H2, BodySmall, Meta } from "../Typography";
import Link from "next/link";
import Header from "../Header";
import styles from "./index.module.scss";

const StoriesList = ({ stories, activeFilter, ads }) => {
  const filteredStories = stories.results.filter((story) => {
    if (activeFilter) {
      return story.data.tags.find((tag) => {
        if (tag.tag.data.title && tag.tag.data.title === activeFilter)
          return story;
      });
    } else {
      return story;
    }
  });

  return (
    <div className={styles.Page}>
      {filteredStories.length > 0 ? (
        filteredStories.map((story, index) => {
          return (
            <>
              <Link href={`/stories/${story.uid}`}>
                <main className={styles.StoryWrapper}>
                  <div className={styles.StoryDetails}>
                    <div className={styles.Preview}>
                      <H2>{story.data.title}</H2>
                      <BodySmall> {story.data.deck}</BodySmall>
                      <div className={styles.Tags}>
                        {story.data.tags.map((tag) => {
                          if (tag.tag.type === "tag") {
                            return (
                              <span
                                className={styles.Tag}
                                style={{
                                  backgroundColor: tag?.tag?.data?.color,
                                }}
                              >
                                {tag?.tag?.data?.title}
                              </span>
                            );
                          }
                        })}
                      </div>
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
              {index % 2 === 0 && ads[index - 2] ? (
                <a href={ads[index - 2].data.link.url} target="_blank">
                  <div className={styles.AdWrapper}>
                    <img
                      className={styles.Ad}
                      src={ads[index - 2].data.ad.url}
                    />
                  </div>
                </a>
              ) : null}
            </>
          );
        })
      ) : (
        <a href={ads[0].data.link.url} target="_blank">
          <div className={styles.AdWrapper}>
            <img className={styles.Ad} src={ads[0].data.ad.url} />
          </div>
        </a>
      )}
    </div>
  );
};

export default StoriesList;
