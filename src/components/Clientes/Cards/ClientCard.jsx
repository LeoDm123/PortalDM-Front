import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import VerClienteButton from "../Buttons/VerClienteButton";
import fetchClients from "../../../hooks/fetchClients";

const ClientCard = ({ onClientCreation }) => {
  const clients = fetchClients(onClientCreation);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card>
      {clients.map((client) => (
        <Card
          key={client._id}
          variant="elevation"
          sx={{
            backgroundColor: "#E1E3E1",
            marginTop: 1,
          }}
        >
          <CardContent>
            <Grid display={"flex"} justifyContent={"space-between"}>
              <Grid display={"flex"} width={"100%"}>
                <Grid width={"100%"}>
                  {client.ClientApellido !== "" ? (
                    <Typography
                      variant="body1"
                      component="div"
                      fontWeight="bold"
                    >
                      {client.ClientApellido}, {client.ClientName}
                    </Typography>
                  ) : (
                    <Typography
                      variant="body1"
                      component="div"
                      fontWeight="bold"
                    >
                      {client.ClientName}
                    </Typography>
                  )}
                  <Typography color="text secondary" variant="subtitle2">
                    Presupuestos Activos: {client.Presupuestos.length}
                  </Typography>
                </Grid>
                <Grid width={"50%"}>
                  <Typography color="text secondary" variant="subtitle2">
                    Saldo Pendiente:
                  </Typography>
                  <Typography color="text secondary" variant="subtitle2">
                    {formatCurrency(
                      client.Presupuestos.reduce((sum, presupuesto) => {
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
                                ).reduce(
                                  (total, pago) => total + pago.PagoMonto,
                                  0
                                )
                              : 0) +
                            (presupuesto.Pagos
                              ? presupuesto.Pagos.filter(
                                  (pago) =>
                                    pago.PagoConcepto === "Actualización"
                                ).reduce(
                                  (total, pago) => total + pago.PagoMonto,
                                  0
                                )
                              : 0) +
                            (presupuesto.Pagos
                              ? presupuesto.Pagos.filter(
                                  (pago) => pago.PagoConcepto === "Extras"
                                ).reduce(
                                  (total, pago) => total + pago.PagoMonto,
                                  0
                                )
                              : 0))
                        );
                      }, 0)
                    )}
                  </Typography>
                </Grid>
              </Grid>
              <Grid marginRight={2}>
                <VerClienteButton selectedClientIndex={client._id} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Card>
  );
};

export default ClientCard;
