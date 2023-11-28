import { useState } from "react";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";

export default function DeletePedidoVidrios() {
  const [error, setError] = useState(null);

  const deletePedido = async (pedidoId) => {
    try {
      console.log("ID", pedidoId);
      const deleteResp = await serverAPI.delete(
        `/pedidoVidrios/deletePedido/${pedidoId}`
      );

      console.log(deleteResp);

      if (deleteResp.data.message === "Pedido eliminado exitosamente") {
        console.log(deleteResp.data.message);
        SwAlertOk();
      } else {
        console.log("Operación de eliminación de material fallida.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return { deletePedido, error };
}

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "El pedido se eliminó correctamente",
    icon: "success",
  });
};
