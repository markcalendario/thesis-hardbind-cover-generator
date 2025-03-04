import styles from "./SectionHeader.module.scss";

export default function SectionHeader({ title, description }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
