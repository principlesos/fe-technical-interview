import React from "react";
import { TodoApp } from "./todo/TodoApp";
import styles from "./App.module.scss";

export function App(): JSX.Element {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.headerTitle}>Todo</h1>
      </header>
      <TodoApp />
    </div>
  );
}
