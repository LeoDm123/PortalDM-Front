import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import CrearCuenta from "../../../pages/Clientes/Modals/CrearCuenta";

export default function AddClientButton({ onClientCreation }) {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddClient = () => {
    navigate("/GestionarClientes");
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <ButtonGroup
          variant="contained"
          aria-label="split button"
          className="mb-3"
        >
          <Button className="AddClientButton" onClick={handleClick}>
            Agregar Cliente
          </Button>
        </ButtonGroup>
        <CrearCuenta
          open={modalOpen}
          onClose={handleCloseModal}
          onClientCreation={onClientCreation}
        />
      </React.Fragment>
    </Grid>
  );
}
