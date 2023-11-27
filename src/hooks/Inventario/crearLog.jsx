import swal from "sweetalert";
import serverAPI from "../../api/serverAPI";

export const crearLog = async (
  Codigo,
  Fecha,
  TipoMov,
  Cantidad,
  Unidad,
  Detalle
) => {
  try {
    const resp = await serverAPI.post("/inv/crearLog", {
      Codigo,
      Fecha,
      TipoMov,
      Cantidad,
      Unidad,
      Detalle,
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
