import { Header } from "./components/Header";
import { Tip } from "./components/Tip";
import { Letter } from "./components/Letter";
import { Input } from "./components/Input";
import { Button } from "./components/Button";
import { LettersUsed } from "./components/LettersUsed";
import type { LettersUsedProps } from "./components/LettersUsed";

import { WORDS } from "./utils/words";
import type { Challenge } from "./utils/words";

import styles from "./app.module.css";
import { use, useEffect, useState } from "react";

function App() {
  function handleRestartGame() {
    startGame();
  }

  const [attempts, setAttempts] = useState(0);
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [letter, setLetter] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);

    const randomWord = WORDS[index];

    setChallenge(randomWord);
    setAttempts(0);
    setLettersUsed([]);
    setLetter("");
  }

  function handleConfirmButton() {
    if (!letter.trim()) {
      return alert("Digite uma letra!");
    }

    setAttempts(attempts + 1);

    if (attempts >= 10) {
      setAttempts(10);
      return alert("Máximo de tentativas atingidos!");
    }

    const value = letter.toUpperCase();

    const exists = lettersUsed.find((used) => used.value === value);

    if (exists) {
      return alert("Letra já utilizada!");
    }

    if (!challenge) {
      return;
    }

    const letterIsCorrect = challenge.word
      .toUpperCase()
      .includes(letter.toUpperCase())
      ? true
      : false;

    setLettersUsed((prev) => [...prev, { value, correct: letterIsCorrect }]);

    setLetter("");
  }

  useEffect(() => {
    startGame();
  }, []);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header current={attempts} max={10} onRestart={handleRestartGame} />
        <Tip tip={challenge.tip} />

        <div className={styles.word}>
          {challenge.word
            .toUpperCase()
            .split("")
            .map((letterNow) => (
              <Letter
                value={
                  lettersUsed.map((letter) => letter.value).includes(letterNow)
                    ? letterNow
                    : ""
                }
              />
            ))}
        </div>

        <h4>Palpite</h4>

        <div className={styles.guess}>
          <Input
            autoFocus
            maxLength={1}
            value={letter}
            placeholder="?"
            onChange={(e) => setLetter(e.target.value)}
          />
          <Button title="Confirmar" onClick={handleConfirmButton} />
        </div>

        <LettersUsed data={lettersUsed} />
      </main>
    </div>
  );
}

export default App;
