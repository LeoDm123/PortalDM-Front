import React from "react";
import "../../../App.css";
import Grid from "@mui/material/Grid";
import PresCard from "../Cards/PresCard";

export default function ListaPresCard({ onPresCreation }) {
  function preventDefault(event) {
    event.preventDefault();
  }

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <PresCard onPresCreation={onPresCreation} />
      </React.Fragment>
    </Grid>
  );
}
