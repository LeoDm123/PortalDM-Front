import { useState, useEffect } from "react";
import swal from "sweetalert";
import serverAPI from "../../api/serverAPI";

export const crearMaterial = async (
  Codigo,
  Descripcion,
  Categoria,
  Unidad,
  Ancho,
  Alto,
  Largo,
  Espesor,
  Costo,
  StockSeguridad,
  Stock,
  Proveedor,
  InvLog
) => {
  try {
    const resp = await serverAPI.post("/mats/crearMaterial/", {
      Codigo,
      Descripcion,
      Categoria,
      Unidad,
      Ancho,
      Alto,
      Largo,
      Espesor,
      Costo,
      StockSeguridad,
      Stock,
      Proveedor,
      InvLog,
    });

    if (resp.data.msg === "Material ya se encuentra registrado") {
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
    text: "El material fue registrado correctamente",
    icon: "success",
  });
};

const SwAlertError = () => {
  swal({
    title: "¡Error!",
    text: "El material que desea registrar, ya se encuentra registrado",
    icon: "error",
  });
};
