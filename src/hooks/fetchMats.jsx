import { useState, useEffect } from "react";
import serverAPI from "../api/serverAPI";

export default function fetchMats(onMatSubmit, onMatEdit) {
  const [Materiales, setMateriales] = useState([]);

  useEffect(() => {
    const fetchMats = async () => {
      try {
        const resp = await serverAPI.get("/mats/obtenerMats");
        setMateriales(resp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMats();
  }, [onMatSubmit, onMatEdit]);

  return Materiales;
}
