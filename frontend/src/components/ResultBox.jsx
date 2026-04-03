"use client";

import styles from "../app/content_generator/content_generator.module.css";

export default function ResultBox({ content, loading }) {
  return (
    <div className={styles.output}>
      {loading ? (
        <div className={styles.loader}></div>
      ) : content ? (
        <pre>{content}</pre>
      ) : (
        <p className={styles.placeholder}>
          No content generated yet. Enter a topic and click{" "}
          <strong>“Generate Content”</strong>!
        </p>
      )}
    </div>
  );
}
