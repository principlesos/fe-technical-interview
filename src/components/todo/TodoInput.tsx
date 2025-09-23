import { useState, FormEvent } from "react";
import classNames from "classnames";
import styles from "./TodoInput.module.scss";

const TodoInput = ({
  className,
  onAdd,
}: {
  className?: string;
  onAdd: (text: string) => void;
}) => {
  const [text, setText] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    onAdd(text);
    setText("");
  }

  return (
    <form onSubmit={onSubmit} className={classNames(styles.form, className)}>
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
};

export default TodoInput;
