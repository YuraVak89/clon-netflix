import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const Navbar = (props) => {
  const { userName } = props;
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);

  const handleOnClickHome = (e) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const hsndlerShowDropDown = (e) => {
    e.preventDefault();
    setShowDropDown(!showDropDown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src="/static/images/Netflix-logo.png"
              alt="Netflix-logo"
              width="128"
              height="34"
            />
          </div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button
              className={styles.usernameBtn}
              onClick={hsndlerShowDropDown}
            >
              <p className={styles.userName}>{userName}</p>
              <Image
                src="/static/images/expand_more.svg"
                alt="Expand more"
                width="24"
                height="24"
              />
            </button>
            {showDropDown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login" className={styles.linkName}>
                    Sign out
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
