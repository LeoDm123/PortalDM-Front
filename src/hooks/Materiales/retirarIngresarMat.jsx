import swal from "sweetalert";
import serverAPI from "../../api/serverAPI";

export const retirarIngresarMat = async (TipoMov, Cantidad, MatID) => {
  try {
    const resp = await serverAPI.post(`/mats/retirarIngresarMat/${MatID}`, {
      TipoMov,
      Cantidad,
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
