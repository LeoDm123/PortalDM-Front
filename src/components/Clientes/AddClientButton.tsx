import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CrearCuenta from "../../pages/Clientes/CrearCuenta";

export default function AddClientButton() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddClient = () => {
    // Your logic for adding a new client goes here
    // For example, you can navigate to the Add Client page
    navigate("/GestionarClientes");
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <ButtonGroup variant="contained" aria-label="split button">
          <Button className="AddClientButton" onClick={handleClick}>
            Agregar Cliente
          </Button>
        </ButtonGroup>
        <CrearCuenta open={modalOpen} onClose={handleCloseModal} />
      </React.Fragment>
    </Grid>
  );
}