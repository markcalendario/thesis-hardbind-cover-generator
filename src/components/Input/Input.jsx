import styles from "./Input.module.scss";

export default function Input({ id, className, label, disabled, ...props }) {
  const combinedClassName = [
    className,
    styles.input,
    disabled && styles.disabled
  ];

  return (
    <div className={combinedClassName.filter(Boolean).join(" ")}>
      <label htmlFor={id}>{label}</label>
      <input id={id} disabled={disabled} {...props} />
    </div>
  );
}
