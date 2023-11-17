import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import AgregarMatList from "../Modals/AgregarMatList";
import ListIcon from "@mui/icons-material/List";

export default function AddMatListButton({ onMatSubmit }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid>
      <Button
        className="AddButton mb-3 ms-3"
        onClick={handleClick}
        sx={{ width: 320 }}
        variant="contained"
        startIcon={<ListIcon />}
      >
        Agregar Listado de Materiales
      </Button>
      <AgregarMatList
        open={modalOpen}
        onClose={handleCloseModal}
        onMatSubmit={onMatSubmit}
      />
    </Grid>
  );
}
