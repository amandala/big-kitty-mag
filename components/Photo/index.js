import React from "react";
import cx from "classNames";
import { BodyExtraSmall } from "../Typography";
import styles from "./index.module.scss";

const Photo = ({ photo }) => {
  console.log(photo);
  return (
    <div
      className={cx(styles.Photo, {
        [styles.PhotoPortrait]:
          photo.dimensions.width < photo.dimensions.height,
      })}
    >
      <img className={styles.PhotoContent} src={photo.url} alt={photo.alt} />
      <div className={styles.Creds}>
        <BodyExtraSmall className={styles.PhotoAlt}>{photo.alt}</BodyExtraSmall>
        {photo.copyright ? (
          <BodyExtraSmall className={styles.PhotoAlt}>
            📸 {photo.copyright}
          </BodyExtraSmall>
        ) : null}
      </div>
    </div>
  );
};

export default Photo;
