import styles from "./InputGroup.module.scss";

export default function InputGroup({ title, children }) {
  return (
    <div className={styles.inputGroup}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {children}
    </div>
  );
}
