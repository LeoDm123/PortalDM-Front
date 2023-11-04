import React from "react";
import "../../../App.css";
import Grid from "@mui/material/Grid";
import ClientCard from "../Cards/ClientCard";

export default function ClientCardList({ onPresCreation, onClienCreation }) {
  function preventDefault(event) {
    event.preventDefault();
  }

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <ClientCard
          onPresCreation={onPresCreation}
          onClienCreation={onClienCreation}
        />
      </React.Fragment>
    </Grid>
  );
}
