import { useRouter } from "next/router";
import styles from "./index.module.scss";
import Header from "../../../components/Header";
import Head from "../../../components/Head";
import {
  H1,
  Meta,
  H5,
  H3,
  H2,
  Body,
  BodyExtraSmall,
} from "../../../components/Typography";
import Photo from "../../../components/Photo";
import { Client } from "../../../prismic-configuration.js";

const Story = (props) => {
  const router = useRouter();
  const { uid } = router.query;

  if (props.data) {
    return (
      <div className={styles.Page}>
        <Head title={props.data.title} />
        <Header pink={true} />
        <main className={styles.Wrapper}>
          <div className={styles.Header}>
            <H1>{props.data.title}</H1>
            <H5>{props.data.author.data.name}</H5>
            <Meta>{props.data.released}</Meta>
          </div>
          <div>
            <Photo photo={props.data.main_photo} />

            <div>
              {props.data.story.map((s) => {
                if (s.type === "heading3") {
                  return <H3 className={styles.Heading}>{s.text}</H3>;
                }
                if (s.type === "heading2") {
                  return <H2 className={styles.Heading}>{s.text}</H2>;
                }
                if (s.type === "heading1") {
                  return <Body className={styles.PullQuote}>{s.text}</Body>;
                }
                if (s.type === "image") {
                  return <Photo photo={s} />;
                }
                return <Body>{s.text}</Body>;
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }
  return null;
};

export async function getServerSideProps(ctx) {
  const req = ctx.req;

  const home = await Client(req).getByUID("article", ctx.params.uid, {
    fetchLinks: ["author.name"],
  });
  return {
    props: home,
  };
}

export default Story;
