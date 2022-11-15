import Image from "next/legacy/image";
import { useState } from "react";
import styles from "./card.module.css";
import { motion } from "framer-motion";
import cls from "classnames"

const Card = (props) => {
  const { imgUrl, size } = props;
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  };

  const handlerImgOnError = () => {
    setImgSrc(
      "https://images.unsplash.com/photo-1597340502454-0aed1f33fc1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
    );
  };

  return (
    <div className={styles.container}>
      <motion.div className={cls(styles.imgMotionWrapper, classMap[size])} whileHover={{ scaleY: 1.1 }}>
        <Image
          src={imgSrc}
          alt="image"
          layout="fill"
          onError={handlerImgOnError}
          className={styles.cardImg}
        />
      </motion.div>
    </div>
  );
};

export default Card;
