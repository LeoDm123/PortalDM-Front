import { useState, useEffect } from "react";
import serverAPI from "../../api/serverAPI";

export default function fetchClients(
  onPresCreation,
  onSubmitPay,
  onClientCreation,
  onSubmitPres,
  onClientDelete,
  onPresEdit,
  onPresDelete,
  onClientChange,
  onPayDelete
) {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const response = await serverAPI.get("/clients/obtenerClientes");
      const sortedClients = response.data.slice();
      sortedClients.sort((a, b) => {
        const apellidoA = a.ClientApellido || a.ClientName[0];
        const apellidoB = b.ClientApellido || b.ClientName[0];
        return apellidoA.localeCompare(apellidoB);
      });
      setClients(sortedClients);
    };

    fetchClients();
  }, [
    onPresCreation,
    onSubmitPay,
    onClientCreation,
    onSubmitPres,
    onClientDelete,
    onPresEdit,
    onPresDelete,
    onClientChange,
    onPayDelete,
  ]);

  return clients;
}
