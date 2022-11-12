import styles from "../styles/Home.module.css";
import Head from "next/head";
import Banner from "../components/banner/banner";
import Navbar from "../components/navbar/navbar";
import Card from "../components/card/card";
import SectionCards from "../components/card/section-cards";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar userName={"userName"}/>
      <Banner
        title="The best film"
        subTitle="Forsage"
        imgUrl="/static/images/forsage.jpg"
      />
      <SectionCards title="Disney"/>
    </div>
  );
}
