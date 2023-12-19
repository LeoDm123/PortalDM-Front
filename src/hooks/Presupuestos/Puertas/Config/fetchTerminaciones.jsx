import { useState, useEffect } from "react";
import serverAPI from "../../../../api/serverAPI";

const useFetchTerminaciones = () => {
  const [loading, setLoading] = useState(true);
  const [Terminaciones, setTerminaciones] = useState([]);

  const fetchTerminaciones = async () => {
    try {
      const resp = await serverAPI.get("/presPuertasSettings/obtenerSettings");
      setTerminaciones(resp.data[0]?.Terminaciones || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTerminaciones();
  }, []);

  return { loading, Terminaciones, fetchTerminaciones };
};

export default useFetchTerminaciones;
