import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AgregarMatList from "../Modals/AgregarMatList";

export default function AddMatListButton({ onMatSubmit }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid item xs={12} md={12} lg={12} xl={12}>
      <React.Fragment>
        <ButtonGroup
          className="mb-3 ms-3"
          variant="contained"
          aria-label="split button"
        >
          <Button
            className="AddButton"
            onClick={handleClick}
            sx={{ width: 300 }}
          >
            Agregar Listado de Materiales
          </Button>
          <AgregarMatList
            open={modalOpen}
            onClose={handleCloseModal}
            onMatSubmit={onMatSubmit}
          />
        </ButtonGroup>
      </React.Fragment>
    </Grid>
  );
}
