import { useContext, useEffect } from "react";
import styles from "./Toast.module.css";
import { UtilityContext } from "../../../contexts/UtilityContext";

const Toast: React.FC = () => {
  const { toast, hideToast } = useContext(UtilityContext);

  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.isVisible, hideToast]);
  return toast.isVisible ? (
    <div className={styles.wrapper}>
      <div className={styles.toast}>
        <p>{toast.message}</p>
        {toast.icon && toast.icon}
      </div>
    </div>
  ) : null;
};

export default Toast;
