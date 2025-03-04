import LinkButton from "../Buttons/LinkButton/LinkButton.jsx";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <LinkButton className={styles.githubBtn}>GitHub</LinkButton>
        </div>
      </div>
    </nav>
  );
}
