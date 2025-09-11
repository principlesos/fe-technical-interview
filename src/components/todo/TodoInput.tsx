import React from "react";
import styles from "./TodoInput.module.scss";

export function TodoInput(props: {
  onAdd: (text: string) => void;
}): JSX.Element {
  const { onAdd } = props;
  const [text, setText] = React.useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onAdd(text);
    setText("");
  }

  return (
    <form onSubmit={onSubmit} className={styles.form}>
      <input
        type="text"
        placeholder="Add a task…"
        aria-label="Todo input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
}
