import { useState } from "react";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";

export default function DeletePago() {
  const [error, setError] = useState(null);

  const deletePago = async (clientId, presupuestoId, pagoId) => {
    try {
      const deleteResp = await serverAPI.delete(
        `/pay/deletePago/${clientId}/${presupuestoId}/${pagoId}`
      );

      console.log(deleteResp);

      if (deleteResp.data.message === "Pago eliminado correctamente") {
        console.log(deleteResp.data.message);
        SwAlertOk();
      } else {
        console.log("Operación de eliminación de pago fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deletePago, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "El pago se eliminó correctamente del presupuesto",
    icon: "success",
  });
};
