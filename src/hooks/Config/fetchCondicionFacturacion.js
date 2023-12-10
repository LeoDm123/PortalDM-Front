import { useState, useEffect } from "react";
import serverAPI from "../../api/serverAPI";

const useFetchCondicionFacturacion = () => {
  const [loading, setLoading] = useState(true);
  const [condiciones, setCondiciones] = useState([]);

  const fetchCondiciones = async () => {
    try {
      const resp = await serverAPI.get("/settings/obtenerSettings");
      setCondiciones(resp.data[0]?.CondicionFacturacion || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCondiciones();
  }, []);

  return { loading, condiciones, fetchCondiciones };
};

export default useFetchCondicionFacturacion;
