import React from "react";
import { BodyExtraSmall } from "../Typography";
import styles from "./index.module.scss";

const Photo = ({ photo }) => {
  return (
    <div className={styles.Photo}>
      <img className={styles.PhotoContent} src={photo.src} alt={photo.alt} />
      <div className={styles.Creds}>
        <BodyExtraSmall className={styles.PhotoAlt}>{photo.alt}</BodyExtraSmall>
        <BodyExtraSmall className={styles.PhotoAlt}>
          📸 {photo.copyright}
        </BodyExtraSmall>
      </div>
    </div>
  );
};

export default Photo;
