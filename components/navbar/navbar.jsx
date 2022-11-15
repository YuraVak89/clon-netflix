import styles from "./navbar.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { magic } from "../../lib/magic-client";

const Navbar = () => {
  const router = useRouter();
  const [showDropDown, setShowDropDown] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function getUsername() {
      try {
        const { email } = await magic.user.getMetadata();
        if (email) {
          console.log(email);
          setUsername(email);
        }
      } catch (error) {
        console.log("Error retrieving email:", error);
      }
    }
    getUsername();
  }, []);

  const handleSignout = async (e) => {
    e.preventDefault();

    try {
      await magic.user.logout();
      console.log(await magic.user.isLoggedIn());
      router.push("/signin");
    } catch (error) {
      console.error("Error logging out", error);
      router.push("/signin");
    }
  };

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
            <Image src="/static/images/Netflix-Logo.png" alt="Netflix-logo" width="128" height="34" />
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
            <button className={styles.usernameBtn} onClick={hsndlerShowDropDown}>
              <p className={styles.userName}>{username}</p>
              <Image src="/static/images/expand_more.svg" alt="Expand more" width="24" height="24" />
            </button>
            {showDropDown && (
              <div className={styles.navDropdown}>
                <div>
                  <a className={styles.linkName} onClick={handleSignout}>
                    Sign out
                  </a>
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
