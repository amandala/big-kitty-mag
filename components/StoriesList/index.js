import { H1, H2, BodySmall, Meta } from "../Typography";
import cx from "classnames";
import Link from "next/link";
import styles from "./index.module.scss";
import React from "react";

const StoriesList = ({ stories, activeFilter, ads, searchTerm }) => {
  const [adNumber, setAdNumber] = React.useState(0);
  const [filteredStories, setFilteredStories] = React.useState([]);
  const [chunkedStories, setChunked] = React.useState(chunkArray(stories, 3));

  const addSearchFilter = (list) => {
    return list.filter(story => story.data.title.toLowerCase().includes(searchTerm))
  }

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

  React.useEffect(() => {

    const filtered = stories.filter((story) => {
      if (activeFilter) {
        return story.data.tags.find((tag) => {
          if (tag.tag.data.title && tag.tag.data.title === activeFilter){
            return story
          }
        });
      } else {
        return story;
      }
    });
  
    if (searchTerm && searchTerm.length > 0) {
      const searched = addSearchFilter(filtered);
      setFilteredStories(searched);
    }
    else {
      setFilteredStories(filtered);
    }

  }, [stories, activeFilter, searchTerm]);

  React.useEffect(() => {
    
    const chunked = chunkArray(filteredStories, 3);
    setChunked(chunked);
  
  },[filteredStories, searchTerm, stories])


  const renderAd = (ad) => {
    if (ad && ad.data) {
      return (
        <a
          href={ad.data.link.url}
          target="_blank"
          alt={ad.alt_text}
          key={ad.alt_text}
        >
          <div
            className={styles.AdWrapper}
            style={{ backgroundColor: ad.data.background_color }}
          >
            <img className={styles.Ad} src={ad.data.ad.url} />
          </div>
        </a>
      );
    }
    return null;
  };

  return (
    <div className={styles.Page}>
      {chunkedStories.map((chunk, chunkIndex) => {
        return (
          <div key={chunkIndex}>
            {chunk.map((story) => {
              
              
              return (
                <div key={story.uid} className={cx({[styles.Show]: story.data.title.includes(searchTerm) || !searchTerm || searchTerm.length < 1})}>
                  <Link href={`/stories/${story.uid}`} >
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
                                    key={tag?.tag?.data?.title}
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
                </div>
              );
            })}
            {ads && renderAd(ads[chunkIndex])}
          </div>
        );
      })}
    </div>
  );
};

export default StoriesList;
