import { useEffect } from "react";

function Toast({ message, clear }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      clear();
    }, 2000);

    return () => clearTimeout(timer);
  }, [clear]);

  return (
    <div className="toast">
      {message}
    </div>
  );
}

export default Toast;