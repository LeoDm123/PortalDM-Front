import { useState, useEffect } from "react";
import serverAPI from "../../../../api/serverAPI";

const useFetchMaterialesRelleno = () => {
  const [loading, setLoading] = useState(true);
  const [materialesRelleno, setMaterialesRelleno] = useState([]);

  const fetchMaterialesRelleno = async () => {
    try {
      const resp = await serverAPI.get("/presPuertasSettings/obtenerSettings");
      setMaterialesRelleno(resp.data[0]?.Relleno || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterialesRelleno();
  }, []);

  return { loading, materialesRelleno, fetchMaterialesRelleno };
};

export default useFetchMaterialesRelleno;
