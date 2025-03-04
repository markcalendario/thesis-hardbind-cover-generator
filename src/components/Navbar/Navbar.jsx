import LinkButton from "../Buttons/LinkButton/LinkButton.jsx";
import styles from "./Navbar.module.scss";

export default function Navbar() {
  const githubLink =
    "https://github.com/markcalendario/thesis-hardbind-cover-generator";

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <LinkButton
            href={githubLink}
            className={styles.githubBtn}>
            GitHub
          </LinkButton>
        </div>
      </div>
    </nav>
  );
}
