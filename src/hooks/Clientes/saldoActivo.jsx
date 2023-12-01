import React, { useState, useEffect } from "react";
import fetchClients from "./fetchClients";

const SaldosTotales = () => {
  const ClientsData = fetchClients();
  const [saldoActivo, setSaldoActivo] = useState(0);
  const [saldoDeudor, setSaldoDeudor] = useState(0);

  useEffect(() => {
    const calculateTotalSaldo = (status) => {
      let totalSaldo = 0;

      for (const client of ClientsData) {
        if (client.ClientStatus === status) {
          totalSaldo += client.Presupuestos.reduce((sum, presupuesto) => {
            return (
              sum +
              (presupuesto.Total -
                (presupuesto.Pagos
                  ? presupuesto.Pagos.filter(
                      (pago) =>
                        pago.PagoConcepto === "Anticipo Parcial" ||
                        pago.PagoConcepto === "Anticipo Completo" ||
                        pago.PagoConcepto === "Saldo Parcial" ||
                        pago.PagoConcepto === "Saldo Completo"
                    ).reduce((total, pago) => total + pago.PagoMonto, 0)
                  : 0) +
                (presupuesto.Pagos
                  ? presupuesto.Pagos.filter(
                      (pago) => pago.PagoConcepto === "Actualización"
                    ).reduce((total, pago) => total + pago.PagoMonto, 0)
                  : 0) +
                (presupuesto.Pagos
                  ? presupuesto.Pagos.filter(
                      (pago) => pago.PagoConcepto === "Extra"
                    ).reduce((total, pago) => total + pago.PagoMonto, 0)
                  : 0))
            );
          }, 0);
        }
      }

      if (status === "Activo") {
        setSaldoActivo(totalSaldo);
      } else if (status === "Deudor") {
        setSaldoDeudor(totalSaldo);
      }
    };

    calculateTotalSaldo("Activo");
    calculateTotalSaldo("Deudor");
  }, [ClientsData]);

  return { saldoActivo, saldoDeudor };
};

export default SaldosTotales;
