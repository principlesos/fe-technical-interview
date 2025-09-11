import React from "react";
import type { TodoItem } from "./types";
import styles from "./TodoList.module.scss";

export function TodoList(props: {
  items: TodoItem[];
  onToggle: (id: any) => void;
  onRemove: (id: any) => void;
}): JSX.Element {
  const { items, onToggle, onRemove } = props;

  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <div className={styles.left}>
            <input
              id={`todo-${item.id}`}
              type="checkbox"
              checked={item.done}
              onChange={() => onToggle(item.id)}
              className={styles.checkbox}
            />
            <label htmlFor={`todo-${item.id}`} className={styles.label}>
              <span
                className={`${styles.text} ${item.done ? styles.textDone : ""}`}
              >
                {item.text}
              </span>
            </label>
          </div>
          <button
            type="button"
            onClick={() => onRemove(item)}
            aria-label="Remove todo"
            className={styles.removeBtn}
          >
            ✕
          </button>
        </li>
      ))}
    </ul>
  );
}
