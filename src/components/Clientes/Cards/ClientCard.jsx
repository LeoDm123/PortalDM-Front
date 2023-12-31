import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import fetchClients from "../../../hooks/Clientes/fetchClients";
import VerClienteButton from "../Buttons/VerClienteButton";
import FormatCurrency from "../../../hooks/formatCurrency";
import { DividerTitle } from "../../Dividers";

const ClientCard = ({ onPresCreation, onClientCreation }) => {
  const [onSubmitPay, setOnSubmitPay] = useState(false);
  const [onSubmitPres, setOnSubmitPres] = useState(false);
  const [onClientDelete, setOnClientDelete] = useState(false);
  const [onPresEdit, setOnPresEdit] = useState(false);
  const [onPresDelete, setOnPresDelete] = useState(false);
  const [onClientChange, setOnClientChange] = useState(false);
  const [onPayDelete, setOnPayDelete] = useState(false);
  const formatCurrency = FormatCurrency();
  const clients = fetchClients(
    onPresCreation,
    onSubmitPay,
    onClientCreation,
    onClientDelete,
    onSubmitPres,
    onPresEdit,
    onPresDelete,
    onClientChange,
    onPayDelete
  );

  const handleOnSubmitPay = () => {
    setOnSubmitPay(!onSubmitPay);
  };

  const handleOnSubmitPres = () => {
    setOnSubmitPres(!onSubmitPres);
  };

  const handleOnClientDelete = () => {
    setOnClientDelete(!onClientDelete);
  };

  const handleOnPresEdit = () => {
    setOnPresEdit(!onPresEdit);
  };

  const handleOnPresDelete = () => {
    setOnPresDelete(!onPresDelete);
  };

  const handleOnClientChange = () => {
    setOnClientChange(!onClientChange);
  };

  const handleOnPayDelete = () => {
    setOnPayDelete(!onPayDelete);
  };

  return (
    <Card>
      {clients
        .filter((client) =>
          client.Presupuestos.filter(
            (p) => p.Estado === "Activo" || p.Estado === "Deudor"
          )
        )
        .map((client) => (
          <Card
            key={client._id}
            variant="elevation"
            sx={{
              backgroundColor: "#E1E3E1",
              marginTop: 1,
            }}
          >
            <Grid
              width={"100%"}
              sx={{
                paddingX: 2,
                marginY: 1,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {client.ClientStatus === "Deudor" ? (
                  <Typography
                    variant="body1"
                    component="div"
                    fontWeight="bold"
                    color="error"
                  >
                    {client.ClientApellido !== ""
                      ? `${client.ClientApellido}, ${client.ClientName}`
                      : client.ClientName}
                  </Typography>
                ) : (
                  <Typography variant="body1" component="div" fontWeight="bold">
                    {client.ClientApellido !== ""
                      ? `${client.ClientApellido}, ${client.ClientName}`
                      : client.ClientName}
                  </Typography>
                )}
              </Grid>

              <Grid marginRight={0}>
                <VerClienteButton
                  selectedClientIndex={client._id}
                  onSubmitPay={handleOnSubmitPay}
                  onSubmitPres={handleOnSubmitPres}
                  onDeleteClient={handleOnClientDelete}
                  onPresEdit={handleOnPresEdit}
                  onPresDelete={handleOnPresDelete}
                  onClientChange={handleOnClientChange}
                  onPayDelete={handleOnPayDelete}
                />
              </Grid>
            </Grid>
            <Grid sx={{ display: "flex", width: "100%" }}>
              <CardContent
                sx={{
                  paddingY: 0,
                  width: "40%",
                  display: "flex",
                }}
              >
                <Grid sx={{ width: "100%" }}>
                  <Grid sx={{ display: "flex" }}>
                    <Grid>
                      <Typography
                        color="text secondary"
                        variant="subtitle2"
                        fontWeight="bold"
                        mr={1}
                      >
                        Saldo Pendiente:
                      </Typography>
                    </Grid>
                    <Grid>
                      <Typography
                        color="text secondary"
                        variant="subtitle2"
                        fontWeight="bold"
                      >
                        {formatCurrency(
                          client.Presupuestos.reduce((sum, presupuesto) => {
                            return (
                              sum +
                              (presupuesto.Total -
                                (presupuesto.Pagos
                                  ? presupuesto.Pagos.filter(
                                      (pago) =>
                                        pago.PagoConcepto ===
                                          "Anticipo Parcial" ||
                                        pago.PagoConcepto ===
                                          "Anticipo Completo" ||
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
                                      (pago) => pago.PagoConcepto === "Extra"
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
                  <Grid>
                    <Typography variant="subtitle2" mr={1} mt={1}>
                      CUIT: {client.ClientCUIT}
                    </Typography>
                    <Typography variant="subtitle2" mr={1} mt={1}>
                      Email: {client.ClientEmail}
                    </Typography>
                    <Typography variant="subtitle2" mr={1} mt={1}>
                      Celular: {client.ClientTel}
                    </Typography>
                    <Typography variant="subtitle2" mr={1} mt={1} mb={1}>
                      Dirección: {client.ClientAdress}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <Grid
                sx={{
                  px: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 160,
                  width: "60%",
                  overflow: "auto",
                  scrollbarWidth: "thin",
                  scrollbarColor: "dark",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "lightgray",
                    borderRadius: "5px",
                  },
                }}
              >
                <DividerTitle />
                <Grid sx={{ display: "Flex", width: "100%", marginTop: "2px" }}>
                  <CardContent sx={{ padding: 0, width: "100%" }}>
                    {client.Presupuestos.filter(
                      (presupuesto) =>
                        presupuesto.Estado === "Activo" ||
                        presupuesto.Estado === "En proceso" ||
                        presupuesto.Estado === "A cobrar"
                    ).map((presupuesto) => {
                      return (
                        <Card
                          key={presupuesto.PresupuestoCodigo}
                          variant="elevation"
                          sx={{ marginBottom: 1 }}
                        >
                          <Grid
                            sx={{
                              display: "flex",
                              width: "100%",
                              justifyContent: "space-between",
                              padding: 3,
                            }}
                          >
                            <Typography
                              color="text secondary"
                              variant="subtitle2"
                              width={"30%"}
                            >
                              {presupuesto.PresupuestoCodigo}
                            </Typography>
                            <Typography
                              color="text secondary"
                              variant="subtitle2"
                              width={"40%"}
                            >
                              Estado: {presupuesto.Estado}
                            </Typography>
                            <Typography
                              color="text secondary"
                              variant="subtitle2"
                              width={"30%"}
                              textAlign={"right"}
                            >
                              {formatCurrency(
                                presupuesto.Total -
                                  (presupuesto.Pagos
                                    ? presupuesto.Pagos.filter(
                                        (pago) =>
                                          pago.PagoConcepto ===
                                            "Anticipo Parcial" ||
                                          pago.PagoConcepto ===
                                            "Anticipo Completo" ||
                                          pago.PagoConcepto ===
                                            "Saldo Parcial" ||
                                          pago.PagoConcepto === "Saldo Completo"
                                      ).reduce(
                                        (sum, pago) => sum + pago.PagoMonto,
                                        0
                                      )
                                    : 0) +
                                  (presupuesto.Pagos
                                    ? presupuesto.Pagos.filter(
                                        (pago) =>
                                          pago.PagoConcepto === "Actualización"
                                      ).reduce(
                                        (sum, pago) => sum + pago.PagoMonto,
                                        0
                                      )
                                    : 0) +
                                  (presupuesto.Pagos
                                    ? presupuesto.Pagos.filter(
                                        (pago) => pago.PagoConcepto === "Extra"
                                      ).reduce(
                                        (sum, pago) => sum + pago.PagoMonto,
                                        0
                                      )
                                    : 0)
                              )}
                            </Typography>
                          </Grid>
                        </Card>
                      );
                    })}
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
          </Card>
        ))}
    </Card>
  );
};

export default ClientCard;
