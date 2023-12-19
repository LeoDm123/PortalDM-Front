import { useState } from "react";
import swal from "sweetalert";
import serverAPI from "../../../../api/serverAPI";

export default function DeleteApliques() {
  const [error, setError] = useState(null);

  const deleteApliques = async (index) => {
    try {
      const deleteResp = await serverAPI.delete(
        `/presPuertasSettings/deleteApliques/${index}`
      );

      console.log(deleteResp);

      if (deleteResp.data.message === "Aplique eliminado correctamente") {
        console.log(deleteResp.data.message);
        SwAlertOk();
      } else {
        console.log("Operación de eliminación fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteApliques, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "El material se eliminó correctamente",
    icon: "success",
  });
};
