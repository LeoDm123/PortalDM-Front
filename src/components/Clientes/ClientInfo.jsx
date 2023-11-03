import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import fetchClients from "../../hooks/fetchClients";

const ClientInfo = () => {
  const ClientsData = fetchClients();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const calculateTotalActivePresupuestos = () => {
    let totalActivePresupuestos = 0;

    for (const client of ClientsData) {
      totalActivePresupuestos += client.Presupuestos.length;
    }

    return totalActivePresupuestos;
  };

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

    return totalSaldo;
  };

  const totalSaldoActivo = calculateTotalSaldo("Activo");
  const totalSaldoDeudor = calculateTotalSaldo("Deudor");

  const totalActivePresupuestos = calculateTotalActivePresupuestos();

  return (
    <Grid
      sx={{
        pt: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h6" component="div">
        Cantidad de Clientes Activos: {ClientsData.length}
      </Typography>
      <Typography sx={{ mt: 1 }} variant="h6" component="div">
        Cantidad de Presupuestos Activos: {totalActivePresupuestos}
      </Typography>
      <Typography sx={{ mt: 1 }} variant="h6" color="green">
        Saldo a Cobrar: {formatCurrency(totalSaldoActivo)}
      </Typography>
      <Typography sx={{ mt: 1 }} variant="h6" color="error">
        Saldo de Incobrables: {formatCurrency(totalSaldoDeudor)}
      </Typography>
    </Grid>
  );
};

export default ClientInfo;
