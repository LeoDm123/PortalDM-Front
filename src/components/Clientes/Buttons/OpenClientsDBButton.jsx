import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CrearCuenta from "../../../pages/Clientes/Modals/CrearCuenta";

export default function OpenClientesDBButton() {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <ButtonGroup
          variant="contained"
          aria-label="split button"
          className="mb-3 ms-3"
        >
          <Button
            className="AddClientButton"
            onClick={() => navigate("/ClientesDB")}
          >
            Abrir Base de Datos
          </Button>
        </ButtonGroup>
      </React.Fragment>
    </Grid>
  );
}
