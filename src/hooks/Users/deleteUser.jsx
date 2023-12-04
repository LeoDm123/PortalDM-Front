import { useState } from "react";
import swal from "sweetalert";
import serverAPI from "../../api/serverAPI";

export default function DeleteUser() {
  const [error, setError] = useState(null);

  const deleteUser = async (userId) => {
    try {
      const deleteResp = await serverAPI.delete(
        `/auth/deleteUsuario/${userId}`
      );

      console.log(deleteResp);

      if (deleteResp.data.message === "Usuario eliminado correctamente") {
        console.log(deleteResp.data.message);
        SwAlertOk();
      } else {
        console.log("Operación de eliminación de usuario fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deleteUser, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "El usuario se eliminó correctamente",
    icon: "success",
  });
};
