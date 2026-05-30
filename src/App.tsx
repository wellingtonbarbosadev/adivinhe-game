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
import { useEffect, useState } from "react";

function App() {
  function handleRestartGame() {
    startGame();
  }

  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [letter, setLetter] = useState("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  const MAX_ATTEMPTS = (challenge?.word.length ?? 0) + 5;

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);

    const randomWord = WORDS[index];

    setChallenge(randomWord);
    setLettersUsed([]);
    setLetter("");
  }

  function handleConfirmButton() {
    if (!letter.trim()) {
      return alert("Digite uma letra!");
    }

    const value = letter.toUpperCase();

    const exists = lettersUsed.find((used) => used.value === value);

    if (exists) {
      setLetter("");
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

  function endGame(message: string) {
    alert(message);
    return startGame();
  }

  useEffect(() => {
    startGame();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (lettersUsed.length === MAX_ATTEMPTS) {
        return endGame("Que pena, você usou todas as suas tentativas :(");
      }

      const hasWon = challenge?.word
        .toUpperCase()
        .split("")
        .every((letter) => lettersUsed.find((used) => used.value === letter));

      if (hasWon) {
        return endGame("Parabéns, você ganhou! :D");
      }
    }, 200);
  }, [lettersUsed.length]);

  if (!challenge) {
    return;
  }

  return (
    <div className={styles.container}>
      <main>
        <Header
          current={lettersUsed.length}
          max={MAX_ATTEMPTS}
          onRestart={handleRestartGame}
        />
        <Tip tip={challenge.tip} />

        <div className={styles.word}>
          {challenge.word
            .toUpperCase()
            .split("")
            .map((letter, index) => {
              const letterUsed = lettersUsed.find(
                (char) => char.value === letter,
              );

              return (
                <Letter
                  key={index}
                  value={letterUsed ? letter : ""}
                  color={letterUsed?.correct ? "correct" : "default"}
                />
              );
            })}
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
