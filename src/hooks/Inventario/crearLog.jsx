import swal from "sweetalert";
import serverAPI from "../../api/serverAPI";

export const crearLog = async (
  Codigo,
  Descripcion,
  Fecha,
  NroPedido,
  TipoMov,
  Cantidad,
  Unidad,
  Comentario
) => {
  try {
    const resp = await serverAPI.post("/inv/crearLog", {
      Codigo,
      Descripcion,
      Fecha,
      NroPedido,
      TipoMov,
      Cantidad,
      Unidad,
      Comentario,
    });

    SwAlertOk();
    onClose();
  } catch (error) {
    console.error(error);
  }
};

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "Movimiento de inventario registrado correctamente",
    icon: "success",
  });
};
