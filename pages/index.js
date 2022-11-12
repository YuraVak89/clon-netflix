import styles from "../styles/Home.module.css";
import Head from "next/head";
import Banner from "../components/banner/banner";
import Navbar from "../components/navbar/navbar";
import SectionCards from "../components/card/section-cards";
import { getVideos } from "../lib/videos";

export const getServerSideProps = async (searchParams) => {
  const disneyVideos = await getVideos("disney trailer");
  const travelVideos = await getVideos("indie music");
  const productivityVideos = await getVideos("Productivity");

  return { props: { disneyVideos, travelVideos, productivityVideos } };
};

export default function Home({ disneyVideos, travelVideos, productivityVideos }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar userName={"userName"} />
      <Banner title="The best film" subTitle="Forsage" imgUrl="/static/images/forsage.jpg" />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Disney" videos={disneyVideos} size="large" />
        <SectionCards title="Travel" videos={travelVideos} size="small" />
        <SectionCards title="Productivity" videos={productivityVideos} size="medium" />
        <SectionCards title="Popular" videos={disneyVideos} size="small" />
      </div>
    </div>
  );
}
