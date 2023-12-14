import { useState } from "react";
import swal from "sweetalert";
import serverAPI from "../../../../api/serverAPI";

export default function DeleteMaterialesMarco() {
  const [error, setError] = useState(null);

  const deleteMaterialesMarco = async (index) => {
    try {
      const deleteResp = await serverAPI.delete(
        `/presPuertasSettings/deleteComponenteMarco/${index}`
      );

      console.log(deleteResp);

      if (deleteResp.data.message === "Material eliminado correctamente") {
        console.log(deleteResp.data.message);
        SwAlertOk();
      } else {
        console.log("Operación de eliminación fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteMaterialesMarco, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "El material se eliminó correctamente",
    icon: "success",
  });
};
