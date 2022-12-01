import Navbar from "../../components/navbar/navbar";
import SectionCards from "../../components/card/section-cards";
import Head from "next/head";
import styles from "../../styles/MyList.module.css";
import { redirectUser } from "../../utils/redirectUsers";
import { getMyList } from "../../lib/videos";

export async function getServerSideProps(context) {
  const { userId, token } = await redirectUser(context);
  const videos = await getMyList(userId, token);

  return {
    props: {
      myListVideos: videos,
    },
  };
}

const MyList = ({ myListVideos }) => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <Navbar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
};

export default MyList;
