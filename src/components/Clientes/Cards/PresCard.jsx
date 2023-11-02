import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import fetchClients from "../../../hooks/fetchClients";

const PresCard = ({ onPresCreation }) => {
  const clients = fetchClients(onPresCreation);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
      minimumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card>
      {clients
        .filter((client) =>
          client.Presupuestos.some((p) => p.Estado === "Activo")
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
            <Grid width={"100%"} sx={{ marginLeft: 2, marginTop: 1 }}>
              {client.ClientApellido !== "" ? (
                <Typography variant="body1" component="div" fontWeight="bold">
                  {client.ClientApellido}, {client.ClientName}
                </Typography>
              ) : (
                <Typography variant="body1" component="div" fontWeight="bold">
                  {client.ClientName}
                </Typography>
              )}
            </Grid>
            <CardContent sx={{ paddingY: 0 }}>
              {client.Presupuestos.filter(
                (presupuesto) => presupuesto.Estado === "Activo"
              ).map((presupuesto) => {
                return (
                  <Card
                    key={presupuesto.PresupuestoCodigo}
                    variant="elevation"
                    sx={{ marginTop: 1 }}
                  >
                    <CardContent>
                      <Typography color="text secondary" variant="subtitle2">
                        {presupuesto.PresupuestoCodigo}
                      </Typography>
                    </CardContent>
                  </Card>
                );
              })}
            </CardContent>
          </Card>
        ))}
    </Card>
  );
};

export default PresCard;
