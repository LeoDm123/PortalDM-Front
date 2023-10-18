import React from "react";
import Link from "@mui/material/Link";
import Title from "../../../js/Title";
import "../../../App.css";
import Grid from "@mui/material/Grid";
import GoBackButton from "../../GoBackButton";
import ClientCard from "../Cards/ClientCard";
import { DividerTitle } from "../../Dividers";

export default function ListaCardClientes() {
  function preventDefault(event) {
    event.preventDefault();
  }

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <Title>Clientes Activos</Title>
        <DividerTitle />

        <ClientCard />
      </React.Fragment>
    </Grid>
  );
}
