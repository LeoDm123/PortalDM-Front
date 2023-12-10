import { useState } from "react";
import swal from "sweetalert";
import serverAPI from "../../api/serverAPI";

export default function DeleteCondicionFacturacion() {
  const [error, setError] = useState(null);

  const deleteCondicionFacturacion = async (index) => {
    try {
      const deleteResp = await serverAPI.delete(
        `/settings/deleteCondicionFacturacion/${index}`
      );

      console.log(deleteResp);

      if (
        deleteResp.data.message ===
        "Condición de facturacion eliminada correctamente"
      ) {
        console.log(deleteResp.data.message);
        SwAlertOk();
      } else {
        console.log("Operación de eliminación fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteCondicionFacturacion, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "La condición se eliminó correctamente",
    icon: "success",
  });
};
