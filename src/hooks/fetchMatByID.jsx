import { useState, useEffect } from "react";
import serverAPI from "../api/serverAPI";

export default function fetchMatByID(matID) {
  const [matByID, setmatByID] = useState([]);

  useEffect(() => {
    const fetchMatByID = async () => {
      try {
        const resp = await serverAPI.get(`/mats/obtenerMatPorID/${matID}`);
        console.log(resp);
        setmatByID(resp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMatByID();
  }, [matID]);

  return matByID;
}
