import Link from "next/link";
import Card from "./card";
import styles from "./section-cards.module.css";
import clsx from "classnames";

const SectionCards = (props) => {
  const { title, videos = [], size, shouldWrap = false, shouldScale } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={clsx(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos &&
          videos.map((e) => {
            return (
              <Link href={`video/${e.id}`} key={e.id}>
                <Card key={e.id} imgUrl={e.imgUrl} size={size} shouldScale={shouldScale} />
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default SectionCards;
