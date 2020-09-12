import { Link as NextLink } from "next/link";
import styles from "./index.module.scss";

const Link = ({ children, href }) => {
  return (
    <Link href={href}>
      <span className={styles.Link}>{children}</span>
    </Link>
  );
};

export default Link;
