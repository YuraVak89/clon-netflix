import Link from "next/link";
import Card from "./card";
import styles from "./section-cards.module.css";

const SectionCards = (props) => {
  const { title, size, videos = [] } = props;
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos &&
          videos.map((e) => {
            return (
              <Link href={`video/${e.id}`} key={e.id}>
                <Card key={e.id} imgUrl={e.imgUrl} size={size} />
              </Link>
            );
          })}
      </div>
    </section>
  );
};

export default SectionCards;
