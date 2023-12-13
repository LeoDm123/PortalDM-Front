import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { DividerTitle } from "../../../Dividers";
import Counter from "../../../Counter";

const formatPuertaDetails = (puertaInfo) => {
  const { Hoja, Marco, Terminacion } = puertaInfo;

  return `Puerta placa de ${Hoja} con marco compuesto de ${Marco} de madera multilaminada. Pintada con tres manos de ${Terminacion} aplicados con pistola neumática. Colocada en obra.`;
};

const formatPuertaMedidas = (puertaMedidas) => {
  const { Ancho, Alto, Cantidad } = puertaMedidas;

  return `${Ancho}[mm.] x ${Alto}[mm.]`;
};

const formatPuertaCant = (puertaCant) => {
  const { Ancho, Alto, Cantidad } = puertaCant;

  return ` ${Cantidad}[u.] `;
};

const PuertaCard = ({ puertaInfo, puertaMedidas, puertaCant }) => {
  const detallePuerta = formatPuertaDetails(puertaInfo);
  const medidasPuerta = formatPuertaMedidas(puertaMedidas);
  const cantidadPuerta = formatPuertaCant(puertaCant);

  return (
    <Card
      variant="elevation"
      sx={{
        backgroundColor: "#E1E3E1",
        marginTop: 1,
        padding: 1,
      }}
    >
      <Grid sx={{ display: "flex" }}>
        <Grid sx={{ display: "flex", alignItems: "center", width: "60%" }}>
          <Typography sx={{ marginX: 2 }}>{detallePuerta}</Typography>
        </Grid>
        <DividerTitle />
        <Grid sx={{ display: "flex", alignItems: "center", width: "18%" }}>
          <Typography sx={{ marginX: 3 }}>{medidasPuerta}</Typography>
        </Grid>
        <DividerTitle />
        <Grid sx={{ display: "flex", alignItems: "center" }}>
          <Typography sx={{ margin: 3 }}>$325.548,48</Typography>
        </Grid>
        <DividerTitle />
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
            marginX: 2,
            width: "8%",
          }}
        >
          <Counter />
        </Grid>
      </Grid>
    </Card>
  );
};

export default PuertaCard;
