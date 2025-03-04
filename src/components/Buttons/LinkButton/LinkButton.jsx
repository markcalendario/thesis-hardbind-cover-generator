import styles from "./LinkButton.module.scss";

export default function LinkButton({ className, href, children }) {
  const classNames = [styles.button, className].join(" ");

  return (
    <a
      className={classNames}
      href={href}>
      {children}
    </a>
  );
}
