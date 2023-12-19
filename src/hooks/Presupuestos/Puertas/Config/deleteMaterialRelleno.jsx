import { useState } from "react";
import swal from "sweetalert";
import serverAPI from "../../../../api/serverAPI";

export default function DeleteMaterialesRelleno() {
  const [error, setError] = useState(null);

  const deleteMaterialesRelleno = async (index) => {
    try {
      const deleteResp = await serverAPI.delete(
        `/presPuertasSettings/deleteRelleno/${index}`
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

  return { deleteMaterialesRelleno, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "El material se eliminó correctamente",
    icon: "success",
  });
};
