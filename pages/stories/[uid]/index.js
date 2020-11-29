import { useRouter } from "next/router";
import { RichTextRenderer } from "prismic-reactjs-custom";

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

const applyLinks = (elem) => {
  if (elem.spans && elem.spans.length > 0) {
    const newText = elem.text;
    elem.spans.forEach((span) => {
      if (span.type === "hyperlink") {
        newText
          .split("")
          .splice(
            span.start,
            0,
            `<a href=${span.data.url} target=${span.data.target}>`
          );
        newText.split().splice(span.end, 0, `</a>`);
      }
    });

    return elem.text;
  } else {
    return elem.text;
  }
};

const PrH1 = (s) => {
  console.log(s);
  return <Body className={styles.PullQuote}>{s.children[0]}</Body>;
};
const PrH2 = (s) => <H2 className={styles.Heading}>{s.text}</H2>;
const PrH3 = (s) => <H3 className={styles.Heading}>{s.text}</H3>;
const PhPhoto = (s) => {
  console.log(s);
  return <Photo photo={s} />;
};
const PrP = (s) => <Body>{s.text}</Body>;

export const RichText = ({ text }) =>
  RichTextRenderer.render(text, {
    heading1: PrH1, // your own component
    heading2: PrH2,
    heading3: PrH3,
    paragraph: PrP,
    image: PhPhoto,
  });

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
            <RichText text={props.data.story} />

            {/* <div>
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
                return <Body>{applyLinks(s)}</Body>;
              })}
            </div> */}
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
