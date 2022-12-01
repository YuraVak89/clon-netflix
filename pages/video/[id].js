import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getYoutubeVideoById } from "../../lib/videos";
import Modal from "react-modal";
import Navbar from "../../components/navbar/navbar";
import styles from "../../styles/VideoModal.module.css";
import clsx from "classnames";
import Like from "../../components/like-icons/like";
import DisLike from "../../components/like-icons/dislike";
Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  const id = context.params.id;
  const videoArray = await getYoutubeVideoById(id);

  return {
    props: {
      video: videoArray.length > 0 ? videoArray[0] : {},
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];
  const paths = listOfVideos.map((id) => ({
    params: { id },
  }));

  return { paths, fallback: "blocking" };
}

const VideoId = ({ video }) => {
  const router = useRouter();
  const videoId = router.query.id;
  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDisLike, setToggleDisLike] = useState(false);

  useEffect(() => {
    const handleLikeDislikeService = async () => {
      const response = await fetch(`/api/stats?videoId=${videoId}`, {
        method: "GET",
      });
      const data = await response.json();

      if (data.length > 0) {
        const favourited = data[0].favourited;
        if (favourited === 1) {
          setToggleLike(true);
        } else if (favourited === 0) {
          setToggleDisLike(true);
        }
      }
    };
    handleLikeDislikeService();
  }, [videoId]);
  
  const handleToggleDislike = async () => {
    console.log("handleToggleDislike");
    setToggleDisLike(!toggleDisLike);
    setToggleLike(toggleDisLike);
    const val = !toggleDisLike;

    const response = await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favourited: val ? 0 : 1,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("data", await response.json());
  };

  const handleToggleLike = async () => {
    console.log("handleToggleLike");
    const val = !toggleLike;
    setToggleLike(!toggleLike);
    setToggleDisLike(toggleLike);
    const response = await fetch("/api/stats", {
      method: "POST",
      body: JSON.stringify({
        videoId,
        favourited: val ? 1 : 0,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("data", await response.json());
  };

  const {
    title,
    publishTime,
    description,
    channelTitle,
    statistics: { viewCount } = { viewCount: 0 },
  } = video;

  return (
    <div className={styles.container}>
      <Navbar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={() => router.back()}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          id="ytplayer"
          className={styles.videoPlayer}
          type="text/html"
          width="100%"
          height="360"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=0&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>
        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
            <button onClick={handleToggleDislike}>
              <div className={styles.btnWrapper}>
                <DisLike selected={toggleDisLike} />
              </div>
            </button>
          </div>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>Cast: </span>
                <span className={styles.channelTitle}>{channelTitle}</span>
              </p>
              <p className={clsx(styles.subText, styles.subTextWrapper)}>
                <span className={styles.textColor}>View Count: </span>
                <span className={styles.channelTitle}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default VideoId;
