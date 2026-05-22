import styles from "./styles.module.css";

import tipIcon from "../../assets/tip.svg";

type Props = {
  tip: string;
};

export function Tip({ tip }: Props) {
  return (
    <div className={styles.tip}>
      <img src={tipIcon} alt="Tip Icon" />
      <div>
        <strong>Dica</strong>
        <span>{tip}</span>
      </div>
    </div>
  );
}
