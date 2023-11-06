import { useState } from "react";
import swal from "sweetalert";
import fetchClientByID from "./fetchClientByID";
import serverAPI from "../api/serverAPI";

export default function useDeletePres(selectedClientIndex) {
  const [error, setError] = useState(null);
  const clientByID = fetchClientByID(selectedClientIndex);

  const deletePres = async (clientId, _id) => {
    try {
      const client = clientByID;

      if (!client) {
        console.error("Cliente no encontrado.");
        return;
      }

      const presupuestoToDelete = client.Presupuestos.find(
        (presupuesto) => presupuesto._id === _id
      );

      if (!presupuestoToDelete) {
        console.error(`Presupuesto con código ${_id} no encontrado.`);
        return;
      } else {
        const deleteResp = await serverAPI.delete(
          `/pres/deletePres/${clientId}/${presupuestoToDelete._id}`
        );

        if (deleteResp.data.message === "Presupuesto eliminado correctamente") {
          console.log(deleteResp.data.message);
          SwAlertOk();
        } else {
          console.log("Operación de eliminación fallida.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deletePres, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "El presupuesto se eliminó correctamente",
    icon: "success",
  });
};
