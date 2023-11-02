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
import ListaCardClientes from "../../components/Clientes/Lists/ListaCardClientes";
import ListaPresCard from "../../components/Clientes/Lists/ListaPresCard";

const defaultTheme = createTheme();

const GestionarClientes = () => {
  const [onClientCreation, setonClientCreation] = useState(false);
  const [onPresCreation, setonPresCreation] = useState(false);

  const handleOnClientCreation = () => {
    setonClientCreation(!onClientCreation);
  };

  const handleOnPresCreation = () => {
    setonPresCreation(!onPresCreation);
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
                    height: 570,
                    width: "50%",
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
                    <Title>Presupuestos Activos</Title>
                    <DividerTitle />
                  </Grid>
                  <Grid
                    sx={{
                      px: 2,
                      py: 1,
                      mb: 1,
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
                    <ListaPresCard onPresCreation={handleOnPresCreation} />
                  </Grid>
                </Paper>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: 570,
                    width: "50%",
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
                    <Title>Clientes Activos</Title>
                    <DividerTitle />
                  </Grid>
                  <Grid
                    sx={{
                      px: 2,
                      py: 1,
                      mb: 1,
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
                    <ListaCardClientes
                      onClientCreation={handleOnClientCreation}
                    />
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
