import { ReactNode } from "react";
import styles from "./CommicBubble.module.css";

interface CommicBubbleProps {
  children: ReactNode;
}

const CommicBubble: React.FC<CommicBubbleProps> = ({ children }) => {
  return <div className={styles.bubble}>{children}</div>;
};

export default CommicBubble;
