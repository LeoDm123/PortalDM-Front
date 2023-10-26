import { createTheme, ThemeProvider } from "@mui/material/styles";
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

const defaultTheme = createTheme();

const GestionarClientes = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
            <Grid container>
              <div className="d-flex">
                <AddClientButton />
                <OpenClientesDBButton />
              </div>
              {/* Listado de Clientes */}
              <Grid xs={12} md={12} lg={12} display={"flex"}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 570,
                    width: "50%",
                    marginRight: 1,
                  }}
                ></Paper>
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
                    <ListaCardClientes />
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
