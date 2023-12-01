import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import "../../App.css";
import Header from "../../components/Menu/Header";
import AddPedidoButton from "../../components/Pedidos/Buttons/AddPedidoButton";
import PedidosPerfilesList from "../../components/Pedidos/Lists/Perfiles/PedidoPerfilesList";
import PedidosHerrajesList from "../../components/Pedidos/Lists/Herrajes/PedidoHerrajesList";
import PedidosVidriosList from "../../components/Pedidos/Lists/Vidrios/PedidoVidriosList";
import PedidosMaderaList from "../../components/Pedidos/Lists/Madera/PedidoMaderaList";
import PedidosVariosList from "../../components/Pedidos/Lists/Varios/PedidoVariosList";
import Title from "../../components/Title";
import { DividerTitle } from "../../components/Dividers";

const defaultTheme = createTheme();

const PedidosMats = () => {
  const [onSubmit, setOnSubmit] = useState(false);
  const [selectedOption, setSelectedOption] = useState("perfiles");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async () => {
    setOnSubmit(!onSubmit);
  };

  const optionComponents = {
    perfiles: <PedidosPerfilesList onSubmit={onSubmit} />,
    herrajes: <PedidosHerrajesList onSubmit={onSubmit} />,
    vidrios: <PedidosVidriosList onSubmit={onSubmit} />,
    madera: <PedidosMaderaList onSubmit={onSubmit} />,
    varios: <PedidosVariosList onSubmit={onSubmit} />,
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
            <Grid container>
              <div className="d-flex">
                <AddPedidoButton onSubmit={handleSubmit} />
              </div>
              <Grid item xs={12} md={12} lg={12} display={"flex"}>
                <Paper
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: 580,
                    width: "100%",
                  }}
                >
                  <Grid
                    sx={{
                      px: 1,
                      pt: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Grid
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Title>Listado de Pedido de Materiales</Title>
                      <Select
                        size="small"
                        variant="standard"
                        value={selectedOption}
                        onChange={handleOptionChange}
                        sx={{ marginBottom: 1 }}
                      >
                        <MenuItem value="perfiles">
                          Pedidos de Perfiles de PVC
                        </MenuItem>
                        <MenuItem value="herrajes">
                          Pedidos de Herrajes de PVC
                        </MenuItem>
                        <MenuItem value="vidrios">Pedidos de Vidrios</MenuItem>
                        <MenuItem value="madera">
                          Pedidos de Insumos de Madera
                        </MenuItem>
                        <MenuItem value="varios">
                          Pedidos de Insumos Varios
                        </MenuItem>
                      </Select>
                    </Grid>
                    <DividerTitle />
                  </Grid>
                  {optionComponents[selectedOption]}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        }
      />
    </ThemeProvider>
  );
};

export default PedidosMats;
