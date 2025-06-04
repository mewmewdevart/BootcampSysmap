import { useState, useEffect } from "react";

export const useToast = (duration = 5000, onClose?: () => void) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timeout);
  }, [duration, onClose]);

  return { visible, setVisible };
};
