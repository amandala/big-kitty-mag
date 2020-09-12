import { useRouter } from "next/router";
import styles from "./index.module.scss";
import { H1, Meta, H5, H3, H2, Body } from "../../components/Typography";
import { Client } from "../../prismic-configuration.js";

const Story = (props) => {
  const router = useRouter();
  const { uid } = router.query;

  // console.log(doc.data.main_photo.dimensions);

  if (props.data) {
    return (
      <div className={styles.Page}>
        <main className={styles.Wrapper}>
          <div className={styles.Header}>
            <H1>{props.data.title}</H1>
            <H5>{props.data.author.data.name}</H5>
            <Meta>{props.data.released}</Meta>
          </div>
          <div>
            <div className={styles.MainPhotoWrapper}>
              <img
                className={styles.Photo}
                src={props.data.main_photo.url}
                alt="Alt"
              />
            </div>
            <div>
              {props.data.story.map((s) => {
                console.log(s);
                if (s.type === "heading3") {
                  return <H3 className={styles.Heading}>{s.text}</H3>;
                }
                if (s.type === "heading2") {
                  return <H2 className={styles.Heading}>{s.text}</H2>;
                }
                if (s.type === "image") {
                  return <img className={styles.Photo} src={s.url} alt="Alt" />;
                }
                return <Body>{s.text}</Body>;
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }
};

export const getServerSideProps = async (ctx) => {
  const req = ctx.req;

  console.log(req);

  const home = await Client(req).getByUID("article", req.url.split("/")[2], {
    fetchLinks: ["author.name"],
  });
  return {
    props: home,
  };
};

export default Story;
