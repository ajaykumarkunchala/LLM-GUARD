import { useEffect, useState } from "react";

function ApiStatus() {
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    fetch("http://localhost:5000/api/health")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend error");
        }

        setStatus("connected");
      })
      .catch(() => {
        setStatus("offline");
      });
  }, []);

  return (
    <div className={`api-status ${status}`}>
      <span className="api-status-dot"></span>

      {status === "checking" && "Checking Backend API..."}

      {status === "connected" && "Backend API Connected"}

      {status === "offline" && "Backend API Offline"}
    </div>
  );
}

export default ApiStatus;