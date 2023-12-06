import { useState } from "react";
import swal from "sweetalert";
import serverAPI from "../../api/serverAPI";

export default function DeleteCondicionPago() {
  const [error, setError] = useState(null);

  const deleteCondicionPago = async (index) => {
    try {
      const deleteResp = await serverAPI.delete(
        `/settings/deleteCondicionPago/${index}`
      );

      console.log(deleteResp);

      if (
        deleteResp.data.message === "Condición de pago eliminada correctamente"
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

  return { deleteCondicionPago, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "La condición se eliminó correctamente",
    icon: "success",
  });
};
