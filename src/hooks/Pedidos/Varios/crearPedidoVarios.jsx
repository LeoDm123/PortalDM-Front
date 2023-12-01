import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";

export const crearPedido = async (
  Cliente,
  Obra,
  Fecha,
  NroPedido,
  Proveedor,
  Materiales
) => {
  try {
    const resp = await serverAPI.post("/pedidoVarios/crearPedido", {
      Cliente,
      Obra,
      Fecha,
      NroPedido,
      Proveedor,
      Estado: "Abierto",
      Materiales,
    });

    if (resp.data.msg === "Pedido ya se encuentra registrado") {
      SwAlertError();
    } else {
      SwAlertOk();
    }
  } catch (error) {
    console.error(error);
  }
};

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "El pedido se agregó correctamente",
    icon: "success",
  });
};

const SwAlertError = () => {
  swal({
    title: "¡Error!",
    text: "El código de pedido ya se encuentra registrado",
    icon: "error",
  });
};
