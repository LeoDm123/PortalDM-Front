import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AddCondicionPagoModal from "../Modal/AddCondicionPagoModal";

export default function AddCondicionPagoButton({ onCondicionCreation }) {
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
        className="AddButton mb-3"
        onClick={handleClick}
        variant="contained"
        startIcon={<NoteAddIcon />}
        size="medium"
        sx={{ width: 300, marginLeft: 1 }}
      >
        Agregar Condición de Pago
      </Button>
      <AddCondicionPagoModal
        open={modalOpen}
        onClose={handleCloseModal}
        onCondicionCreation={onCondicionCreation}
      />
    </Grid>
  );
}
