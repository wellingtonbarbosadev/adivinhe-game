import { Header } from "./components/Header";
import { Tip } from "./components/Tip";

import styles from "./app.module.css";

function App() {
  function handleRestartGame() {
    alert("Reiniciando o game");
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={5} max={10} onRestart={handleRestartGame} />
        <Tip tip="teste" />
      </main>
    </div>
  );
}

export default App;
