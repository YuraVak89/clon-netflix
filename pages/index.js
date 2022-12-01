import styles from "../styles/Home.module.css";
import Head from "next/head";
import Banner from "../components/banner/banner";
import Navbar from "../components/navbar/navbar";
import SectionCards from "../components/card/section-cards";
import {
  getVideos,
  getPopularVideos,
  getWatchItAgainVideos,
} from "../lib/videos";
import { redirectUser } from "../utils/redirectUsers";

export const getServerSideProps = async (context) => {
  const { userId, token } = await redirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  
  const watchItAgainVideos = await getWatchItAgainVideos(userId, token);
  const disneyVideos = await getVideos("disney trailer");
  const travelVideos = await getVideos("indie music");
  const productivityVideos = await getVideos("Productivity");
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
      watchItAgainVideos,
    },
  };
};

export default function Home({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
  watchItAgainVideos,
}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Banner
        title="The best film"
        subTitle="Forsage"
        imgUrl="/static/images/forsage.jpg"
        videoId="kxbGIMVKacg"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards
          title="Watch it again"
          videos={watchItAgainVideos}
          size="small"
        />
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Travel" videos={travelVideos} size="small" />
        <SectionCards
          title="Productivity"
          videos={productivityVideos}
          size="medium"
        />
        <SectionCards title="Popular" videos={popularVideos} size="small" />
      </div>
    </div>
  );
}
