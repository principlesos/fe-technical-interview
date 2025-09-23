import { useState, useEffect } from "react";
import type { TodoItem } from "./types";
import styles from "./TodoApp.module.scss";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const TodoApp = () => {
  const [items, setItems] = useState<TodoItem[]>([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    setCompletedCount(items.filter((item) => item.done).length);
  }, []);

  function handleAdd(text: string): void {
    const trimmed = text.trim();
    if (!trimmed) return;
    setItems((prev) =>
      prev.concat({ id: Date.now(), text: trimmed, done: false })
    );
  }

  function handleToggle(id: number): void {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  function handleRemove(id: number): void {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className={styles.container}>
      <TodoInput className={styles.input} onAdd={handleAdd} />
      <div className={styles.listContainer}>
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
    </div>
  );
};

export default TodoApp;
