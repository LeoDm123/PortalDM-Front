import { useState } from "react";
import swal from "sweetalert";
import serverAPI from "../api/serverAPI";

export default function DeleteMat() {
  const [error, setError] = useState(null);

  const deleteMat = async (MatID) => {
    try {
      console.log("ID", MatID);
      const deleteResp = await serverAPI.delete(`/mats/deleteMat/${MatID}`);

      console.log(deleteResp);

      if (deleteResp.data.message === "Material eliminado correctamente") {
        console.log(deleteResp.data.message);
        SwAlertOk();
      } else {
        console.log("Operación de eliminación de material fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteMat, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "El material se eliminó correctamente del presupuesto",
    icon: "success",
  });
};
