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
        SwAlertOk();
      } else {
        console.log("Operación de eliminación fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteConceptoPago, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "El concepto se eliminó correctamente",
    icon: "success",
  });
};
