import { useState, useEffect } from "react";
import serverAPI from "../../api/serverAPI";

export default function fetchLogs(onMatRecep) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const response = await serverAPI.get("/inv/obtenerLogs");
      const sortedLogData = response.data.sort(
        (a, b) => new Date(b.Fecha) - new Date(a.Fecha)
      );
      setLogs(sortedLogData);
    };

    fetchLogs();
  }, [onMatRecep]);

  return logs;
}
