import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import "../../App.css";
import ListaClientes from "../../components/Clientes/ListaClientes";
import AddClientButton from "../../components/Clientes/Buttons/AddClientButton";
import OpenClientesDBButton from "../../components/Clientes/Buttons/OpenClientsDBButton";
import AddPresupuestoButton from "../../components/Clientes/Buttons/AddPresupuestoButton";
import AddPagoButton from "../../components/Clientes/Buttons/AddPagoButton";
import Header from "../../components/Menu/Header";

const defaultTheme = createTheme();

const GestionarClientes = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container>
              <div className="d-flex">
                <AddClientButton />
                <OpenClientesDBButton />
                <AddPresupuestoButton />
                <AddPagoButton />
              </div>
              {/* Listado de Clientes */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 550,
                  }}
                >
                  <ListaClientes />
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
