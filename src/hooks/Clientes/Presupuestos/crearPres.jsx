import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";

export const crearPresupuesto = async (
  PresupuestoCodigo,
  CondicionFacturacion,
  IVA,
  Precio,
  Total,
  ClientCUIT,
  Estado,
  onClose
) => {
  try {
    const resp = await serverAPI.post("/pres/crearPresupuesto", {
      PresupuestoCodigo,
      CondicionFacturacion,
      IVA,
      Precio,
      Total,
      ClientCUIT,
      Estado,
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
