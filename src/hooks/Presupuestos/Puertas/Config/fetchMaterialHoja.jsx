import { useState, useEffect } from "react";
import serverAPI from "../../../../api/serverAPI";

const useFetchMaterialesHoja = () => {
  const [loading, setLoading] = useState(true);
  const [materialesHoja, setMaterialesHoja] = useState([]);

  const fetchMaterialesHoja = async () => {
    try {
      const resp = await serverAPI.get("/presPuertasSettings/obtenerSettings");
      setMaterialesHoja(resp.data[0]?.ComponenteHoja || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterialesHoja();
  }, []);

  return { loading, materialesHoja, fetchMaterialesHoja };
};

export default useFetchMaterialesHoja;
