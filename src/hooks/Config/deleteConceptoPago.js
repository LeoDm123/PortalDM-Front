import { useState } from "react";
import swal from "sweetalert";
import serverAPI from "../../api/serverAPI";

export default function DeleteConceptoPago() {
  const [error, setError] = useState(null);

  const deleteConceptoPago = async (index) => {
    try {
      const deleteResp = await serverAPI.delete(
        `/settings/deleteConceptoPago/${index}`
      );

      console.log(deleteResp);

      if (
        deleteResp.data.message === "Concepto de pago eliminado correctamente"
      ) {
        console.log(deleteResp.data.message);
        SwalAlertOk();
      } else {
        console.log("Operación de eliminación fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const SwalAlertOk = () => {
    swal({
      title: "¡Éxito!",
      text: "¡El concepto se eliminó correctamente!",
      icon: "success",
    });
  };

  return { deleteConceptoPago, error };
}
