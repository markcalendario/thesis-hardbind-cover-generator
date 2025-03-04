import styles from "./Button.module.scss";

export default function Button({ className, onClick, children }) {
  const classNames = [styles.button, className].join(" ");

  return (
    <button
      className={classNames}
      onClick={onClick}>
      {children}
    </button>
  );
}
