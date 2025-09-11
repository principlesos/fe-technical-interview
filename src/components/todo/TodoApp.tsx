import React from "react";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import type { TodoItem } from "./types";
import styles from "./TodoApp.module.scss";

export function TodoApp(): JSX.Element {
  const [items, setItems] = React.useState<TodoItem[]>([]);
  const [completedCount, setCompletedCount] = React.useState(0);

  React.useEffect(() => {
    setCompletedCount(items.filter((it) => it.done).length);
  }, []);

  function handleAdd(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    setItems((prev) =>
      prev.concat({ id: Date.now().toString(), text: trimmed, done: false })
    );
  }

  function handleToggle(id: string): void {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, done: !it.done } : it))
    );
  }

  function handleRemove(id: string): void {
    setItems((prev) => prev.filter((it) => it.id !== id));
  }

  return (
    <div>
      <TodoInput onAdd={handleAdd} />
      {items.length === 0 ? (
        <div className={styles.empty}>No items yet. Add your first task!</div>
      ) : (
        <TodoList
          items={items}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      )}
      <div className={styles.summary}>
        {items.length} total · {completedCount} completed
      </div>
    </div>
  );
}
