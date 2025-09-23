import styles from "./App.module.scss";
import TodoApp from "./todo/TodoApp";

const App = () => {
  return (
    <div className={styles.container}>
      <header>
        <h1 className={styles.headerTitle}>ToDo</h1>
      </header>
      <TodoApp />
    </div>
  );
};

export default App;
