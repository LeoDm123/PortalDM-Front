import { useState, useEffect } from "react";
import serverAPI from "../../../../api/serverAPI";

const useFetchApliques = () => {
  const [loading, setLoading] = useState(true);
  const [Apliques, setApliques] = useState([]);

  const fetchApliques = async () => {
    try {
      const resp = await serverAPI.get("/presPuertasSettings/obtenerSettings");
      setApliques(resp.data[0]?.Apliques || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApliques();
  }, []);

  return { loading, Apliques, fetchApliques };
};

export default useFetchApliques;
