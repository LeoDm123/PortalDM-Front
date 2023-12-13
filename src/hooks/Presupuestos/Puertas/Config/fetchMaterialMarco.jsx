import { useState, useEffect } from "react";
import serverAPI from "../../../../api/serverAPI";

const useFetchMaterialesMarcos = () => {
  const [loading, setLoading] = useState(true);
  const [materialesMarco, setMaterialesMarco] = useState([]);

  const fetchMaterialesMarco = async () => {
    try {
      const resp = await serverAPI.get("/presPuertasSettings/obtenerSettings");
      setMaterialesMarco(resp.data[0]?.ComponenteMarco || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterialesMarco();
  }, []);

  return { loading, materialesMarco, fetchMaterialesMarco };
};

export default useFetchMaterialesMarcos;
