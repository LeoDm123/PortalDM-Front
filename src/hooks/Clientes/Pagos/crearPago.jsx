import { useState, useEffect } from "react";
import swal from "sweetalert";
import serverAPI from "../../../api/serverAPI";

export const crearPago = async (
  ClientCUIT,
  PresupuestoCodigo,
  FechaPago,
  PagoCondicion,
  PagoConcepto,
  PagoComprobante,
  PagoMonto,
  Comentarios,
  onClose
) => {
  try {
    const resp = await serverAPI.post("/pay/crearPago", {
      ClientCUIT,
      PresupuestoCodigo,
      FechaPago,
      PagoCondicion,
      PagoConcepto,
      PagoComprobante,
      PagoMonto,
      Comentarios,
    });

    if (resp.data.msg === "Cliente no encontrado") {
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
    text: "El pago se agregó correctamente al presupuesto",
    icon: "success",
  });
};

const SwAlertError = () => {
  swal({
    title: "¡Error!",
    text: "El código del cliente no ha sido encontrado",
    icon: "error",
  });
};
