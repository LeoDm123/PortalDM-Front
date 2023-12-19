import { useState } from "react";
import swal from "sweetalert";
import serverAPI from "../../../../api/serverAPI";

export default function DeleteTerminaciones() {
  const [error, setError] = useState(null);

  const deleteTerminaciones = async (index) => {
    try {
      const deleteResp = await serverAPI.delete(
        `/presPuertasSettings/deleteTerminacion/${index}`
      );

      console.log(deleteResp);

      if (deleteResp.data.message === "Terminación eliminada correctamente") {
        console.log(deleteResp.data.message);
        SwAlertOk();
      } else {
        console.log("Operación de eliminación fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteTerminaciones, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "La terminación se eliminó correctamente",
    icon: "success",
  });
};
