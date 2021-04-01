import { H1, H2, BodySmall, Meta } from "../Typography";
import cx from "classnames";
import Link from "next/link";
import styles from "./index.module.scss";

const StoriesList = ({ stories, activeFilter, ads }) => {
  const [adNumber, setAdNumber] = React.useState(0);

  function chunkArray(myArray, chunk_size) {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];

    for (index = 0; index < arrayLength; index += chunk_size) {
      let myChunk = myArray.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }

    return tempArray;
  }

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

  const chunked = chunkArray(filteredStories, 3);

  const renderAd = (ad) => {
    if (ad && ad.data) {
      return (
        <a href={ad.data.link.url} target="_blank" alt={ad.alt_text}>
          <div className={styles.AdWrapper}>
            <img className={styles.Ad} src={ad.data.ad.url} />
          </div>
        </a>
      );
    }
    return null;
  };

  return (
    <div className={styles.Page}>
      {chunked.map((chunk, chunkIndex) => {
        return (
          <div>
            {chunk.map((story) => {
              return (
                <>
                  <Link href={`/stories/${story.uid}`}>
                    <section className={styles.StoryWrapper}>
                      <div className={styles.StoryDetails}>
                        <div className={styles.Preview}>
                          <H2 className={styles.Title}>{story.data.title}</H2>
                          <Meta className={styles.Author}>
                            By {story.data.author.data.name}
                          </Meta>
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
                          className={cx(styles.StoryPhoto, {
                            [styles.StoryPhotoPortrait]:
                              story.data?.main_photo?.dimensions &&
                              story.data.main_photo.dimensions.width <
                                story.data.main_photo.dimensions.height,
                          })}
                          src={story.data.main_photo.url}
                        />
                      </div>
                    </section>
                  </Link>
                </>
              );
            })}

            {renderAd(ads[chunkIndex])}
          </div>
        );
      })}
    </div>
  );
};

export default StoriesList;
