import { useState, useEffect } from "react";
import serverAPI from "../api/serverAPI";

export default function fetchClientByID(
  selectedClientIndex,
  onSubmitPres,
  onPresCreation,
  onSubmitPay,
  onClientChange,
  onPresEdit
) {
  const [clientByID, setClientByID] = useState([]);

  useEffect(() => {
    const fetchClientByID = async () => {
      try {
        const resp = await serverAPI.get(
          `/clients/obtenerClientePorId/${selectedClientIndex}`
        );
        setClientByID(resp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClientByID();
  }, [
    selectedClientIndex,
    onSubmitPres,
    onPresCreation,
    onSubmitPay,
    onClientChange,
    onPresEdit,
  ]);

  return clientByID;
}
