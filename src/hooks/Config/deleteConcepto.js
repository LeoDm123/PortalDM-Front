import { useState } from "react";
import swal from "sweetalert";
import serverAPI from "../../api/serverAPI";

export default function DeleteConcepto() {
  const [error, setError] = useState(null);

  const deleteConcepto = async (index) => {
    try {
      const deleteResp = await serverAPI.delete(
        `/settings/deleteConcepto/${index}`
      );

      console.log(deleteResp);

      if (deleteResp.data.message === "Concepto eliminado correctamente") {
        console.log(deleteResp.data.message);
        SwAlertOk();
      } else {
        console.log("Operación de eliminación fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteConcepto, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "El concepto se eliminó correctamente",
    icon: "success",
  });
};
