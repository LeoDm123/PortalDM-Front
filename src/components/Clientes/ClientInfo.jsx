import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import fetchClients from "../../hooks/fetchClients";
import SaldosTotales from "../../hooks/saldoActivo";
import PresupuestosTotales from "../../hooks/presupuestosActivos";
import FormatCurrency from "../../hooks/formatCurrency";
import { DividerSecondary } from "../Dividers";

const ClientInfo = () => {
  const ClientsData = fetchClients();
  const { saldoActivo, saldoDeudor } = SaldosTotales();
  const { presupuestosActivo, presupuestosCerrados } = PresupuestosTotales();
  const formatCurrency = FormatCurrency();

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
          Saldos de Cuentas
        </Typography>
        <DividerSecondary />
        <Typography sx={{ mt: 1, ml: 1 }} variant="h6" color="green">
          Saldo a cobrar: {formatCurrency(saldoActivo)}
        </Typography>
        <Typography sx={{ mt: 1, ml: 1 }} variant="h6" color="error">
          Saldo de incobrables: {formatCurrency(saldoDeudor)}
        </Typography>
      </Grid>
      <Grid sx={{ marginTop: 2 }}>
        <Typography sx={{ mt: 1 }} variant="h6">
          Clientes y Presupuestos
        </Typography>
        <DividerSecondary />
        <Typography
          sx={{ mt: 1, ml: 1 }}
          variant="h6"
          component="div"
          color="secondary"
        >
          Cantidad de clientes activos: {totalActiveClients}
        </Typography>
        <Typography
          sx={{ mt: 1, ml: 1 }}
          variant="h6"
          component="div"
          color="secondary"
        >
          Cantidad de clientes deudores: {totalDeudorClients}
        </Typography>
        <Typography
          sx={{ mt: 1, ml: 1 }}
          variant="h6"
          component="div"
          color="secondary"
        >
          Cantidad de presupuestos activos: {presupuestosActivo}
        </Typography>
        <Typography
          sx={{ mt: 1, ml: 1 }}
          variant="h6"
          component="div"
          color="secondary"
        >
          Cantidad de presupuestos totales:{" "}
          {presupuestosActivo + presupuestosCerrados}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ClientInfo;
