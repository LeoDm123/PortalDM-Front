import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import fetchClients from "../../hooks/fetchClients";
import { DividerSecondary } from "../Dividers";

const ClientInfo = () => {
  const ClientsData = fetchClients();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

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

  const totalActivePresupuestos = calculateTotalPresupuestos("Activo");
  const totalCerradoPresupuestos = calculateTotalPresupuestos("Cerrado");
  const totalPresupuestos = totalActivePresupuestos + totalCerradoPresupuestos;

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

  const calculateTotalClients = (status) => {
    return ClientsData.filter((client) => client.ClientStatus === status)
      .length;
  };

  const totalActiveClients = calculateTotalClients("Activo");
  const totalDeudorClients = calculateTotalClients("Deudor");

  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid>
        <Typography sx={{ mt: 1 }} variant="h6">
          Contabildad
        </Typography>
        <DividerSecondary />
        <Typography sx={{ mt: 1, ml: 1 }} variant="h6" color="green">
          Saldo a cobrar: {formatCurrency(totalSaldoActivo)}
        </Typography>
        <Typography sx={{ mt: 1, ml: 1 }} variant="h6" color="error">
          Saldo de incobrables: {formatCurrency(totalSaldoDeudor)}
        </Typography>
      </Grid>
      <Grid sx={{ marginTop: 2 }}>
        <Typography sx={{ mt: 1 }} variant="h6">
          Base de Datos
        </Typography>
        <DividerSecondary />
        <Typography sx={{ mt: 1, ml: 1 }} variant="h6" component="div">
          Cantidad de clientes activos: {totalActiveClients}
        </Typography>
        <Typography sx={{ mt: 1, ml: 1 }} variant="h6" component="div">
          Cantidad de clientes deudores: {totalDeudorClients}
        </Typography>
        <Typography sx={{ mt: 1, ml: 1 }} variant="h6" component="div">
          Cantidad de presupuestos activos: {totalActivePresupuestos}
        </Typography>
        <Typography sx={{ mt: 1, ml: 1 }} variant="h6" component="div">
          Cantidad de presupuestos totales: {totalPresupuestos}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ClientInfo;
