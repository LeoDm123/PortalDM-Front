import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import "../../App.css";
import Header from "../../components/Menu/Header";

const defaultTheme = createTheme();

function PedidoPerfiles() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Header
        content={
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}></Grid>
          </Container>
        }
      />
    </ThemeProvider>
  );
}

export default PedidoPerfiles;
