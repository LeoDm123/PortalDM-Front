import { useState, useEffect } from "react";
import serverAPI from "../../api/serverAPI";

const useFetchConceptos = () => {
  const [loading, setLoading] = useState(true);
  const [conceptos, setConceptos] = useState([]);

  const fetchConceptos = async () => {
    try {
      const resp = await serverAPI.get("/settings/obtenerSettings");
      setConceptos(resp.data[0]?.ConceptoPago || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConceptos();
  }, []);

  return { loading, conceptos, fetchConceptos };
};

export default useFetchConceptos;
