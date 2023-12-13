import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";

export const crearPresupuestoPuerta = async (
  Cliente,
  Obra,
  Codigo,
  Descuento,
  Precio,
  IVA,
  PrecioFinal,
  Puertas
) => {
  try {
    const resp = await serverAPI.post("/presPuertas/crearPresupuesto", {
      Cliente,
      Obra,
      Codigo,
      Descuento,
      Precio,
      IVA,
      PrecioFinal,
      Puertas,
    });

    if (
      resp.data.msg ===
      "El código de presupuesto ya se encuentra registrado para este cliente"
    ) {
      SwAlertError();
    } else {
      SwAlertOk();
      onClose();
    }
  } catch (error) {
    console.error(error);
  }
};

const SwAlertOk = () => {
  swal({
    title: "¡Exito!",
    text: "El presupuesto se agregó correctamente",
    icon: "success",
  });
};

const SwAlertError = () => {
  swal({
    title: "¡Error!",
    text: "El presupuesto ya se encuentra registrado",
    icon: "error",
  });
};
