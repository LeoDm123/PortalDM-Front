import React, { useState, useEffect } from "react";
import fetchClients from "./fetchClients";

const PresupuestosTotales = () => {
  const ClientsData = fetchClients();
  const [presupuestosActivo, setPresupuestosActivo] = useState(0);
  const [presupuestosCerrados, setPresupuestosCerrados] = useState(0);

  useEffect(() => {
    const calculateTotalPresupuestos = (status) => {
      let totalPresupuestos = 0;

      for (const client of ClientsData) {
        for (const presupuesto of client.Presupuestos) {
          if (presupuesto.Estado === status) {
            totalPresupuestos += 1;
          }
        }
      }

      return totalPresupuestos;
    };

    setPresupuestosActivo(calculateTotalPresupuestos("Activo"));
    setPresupuestosCerrados(calculateTotalPresupuestos("Cerrados"));
  }, [ClientsData]);

  return { presupuestosActivo, presupuestosCerrados };
};

export default PresupuestosTotales;
