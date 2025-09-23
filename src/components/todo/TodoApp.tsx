import { useState, useEffect } from "react";
import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";
import type { TodoItem } from "./types";
import styles from "./TodoApp.module.scss";

export function TodoApp(): JSX.Element {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    setCompletedCount(items.filter((item) => item.done).length);
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
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  function handleRemove(id: string): void {
    setItems((prev) => prev.filter((item) => item.id !== id));
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
