import { useState, useEffect } from "react";
import serverAPI from "../api/serverAPI";

export default function fetchLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await serverAPI.get("/inv/obtenerLogs");
      const sortedLogs = response.data.slice();
      sortedLogs.sort((a, b) => {
        const FechaA = a.Fecha;
        const FechaB = b.Fecha;
        return FechaA.localeCompare(FechaB);
      });
      setLogs(sortedLogs);
    };

    fetchLogs();
  }, []);

  return logs;
}
