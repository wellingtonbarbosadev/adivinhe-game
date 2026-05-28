import styles from "./styles.module.css";

import { Letter } from "../Letter";

export const LettersUsed = () => {
  return (
    <div className={styles.lettersUsed}>
      <h5>Letras utilizadas</h5>

      <div>
        <Letter value="a" size="small" />
        <Letter value="b" size="small" />
        <Letter value="c" size="small" />
        <Letter value="d" size="small" />
      </div>
    </div>
  );
};
