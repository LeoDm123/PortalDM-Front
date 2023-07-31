import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";

export default function SaveChangesButton({ onPress }) {
  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <ButtonGroup
          className="mb-3"
          variant="contained"
          aria-label="split button"
        >
          <Button onClick={onPress} className="AddMatButton">
            Guardar Cambios
          </Button>
        </ButtonGroup>
      </React.Fragment>
    </Grid>
  );
}
