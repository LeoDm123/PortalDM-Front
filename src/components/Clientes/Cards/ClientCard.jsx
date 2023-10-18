import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import serverAPI from "../../../api/serverAPI";
import VerClienteButton from "../Buttons/VerClienteButton";

const ClientCard = () => {
  const [clientData, setClientData] = useState([]);

  const fetchClientsData = async () => {
    try {
      const resp = await serverAPI.get("/clients/obtenerClientes");
      setClientData(resp.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchClientsData();
  }, []);

  return (
    <Card>
      {clientData.map((client) => (
        <Card
          key={client._id}
          variant="outlined"
          sx={{
            backgroundColor: "#fafafa",
            marginTop: 1,
            borderWidth: 0.5,
            borderColor: "#01662b",
          }}
        >
          <CardContent>
            <Grid display={"flex"}>
              <Grid width={"100%"}>
                {client.Apellido !== "" ? (
                  <Typography variant="h6" component="div">
                    {client.ClientApellido}, {client.ClientName}
                  </Typography>
                ) : (
                  <Typography variant="h6" component="div">
                    {client.ClientName}
                  </Typography>
                )}
                <Typography color="text.secondary">
                  Presupuestos Activos: {client.Presupuestos.length}
                </Typography>
              </Grid>
              <VerClienteButton selectedClientIndex={client._id} />
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Card>
  );
};

export default ClientCard;
