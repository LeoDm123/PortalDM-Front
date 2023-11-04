import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { DividerTitle } from "../../components/Dividers";
import Title from "../../components/Title";
import "../../App.css";
import AddClientButton from "../../components/Clientes/Buttons/AddClientButton";
import OpenClientesDBButton from "../../components/Clientes/Buttons/OpenClientsDBButton";
import Header from "../../components/Menu/Header";
import ClientCardList from "../../components/Clientes/Lists/ClientCardList";
import ClientInfo from "../../components/Clientes/ClientInfo";

const defaultTheme = createTheme();

const GestionarClientes = () => {
  const [onClientCreation, setOnClientCreation] = useState(false);
  const [onPresCreation, setonPresCreation] = useState(false);
  const [onSubmitPay, setOnSubmitPay] = useState(false);

  const handleOnClientCreation = () => {
    setOnClientCreation(!onClientCreation);
  };

  const handleOnPresCreation = () => {
    setonPresCreation(!onPresCreation);
  };

  const handleOnSubmitPay = () => {
    setOnSubmitPay(!onSubmitPay);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
            <Grid container>
              <div className="d-flex">
                <AddClientButton onClientCreation={handleOnClientCreation} />
                <OpenClientesDBButton />
              </div>
              {/* Listado de Clientes */}
              <Grid item xs={12} md={12} lg={12} display={"flex"}>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: 590,
                    width: "60%",
                  }}
                >
                  <Grid
                    sx={{
                      px: 2,
                      pt: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Title>Clientes Activos</Title>
                    <DividerTitle />
                  </Grid>
                  <Grid
                    sx={{
                      px: 1,
                      py: 1,
                      mb: 2,
                      display: "flex",
                      flexDirection: "column",
                      height: 570,
                      marginLeft: 1,
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
                    <ClientCardList
                      onPresCreation={onPresCreation}
                      onClientCreation={onClientCreation}
                    />
                  </Grid>
                </Paper>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: 590,
                    width: "40%",
                    marginLeft: 1,
                  }}
                >
                  <Grid
                    sx={{
                      px: 2,
                      py: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Title>Información Extra</Title>
                    <DividerTitle />
                    <ClientInfo />
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        }
      />
    </ThemeProvider>
  );
};

export default GestionarClientes;
