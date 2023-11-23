import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import "../../App.css";
import Header from "../../components/Menu/Header";
import AddPedidoButton from "../../components/Pedidos/Buttons/Perfiles/AddPedidoButton";
import PedidosPerfilesList from "../../components/Pedidos/Lists/Perfiles/PedidoPerfilesList";
import fetchPedidos from "../../hooks/fetchPedidos";

const defaultTheme = createTheme();

const PedidosMats = () => {
  const [onSubmit, setOnSubmit] = useState(false);

  const handleSubmit = async () => {
    setOnSubmit(!onSubmit);
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
                  <PedidosPerfilesList onSubmit={onSubmit} />
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
