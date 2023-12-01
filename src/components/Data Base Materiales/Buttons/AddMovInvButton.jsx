import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import AddMovInv from "../Modals/AddMovInv";
import AddIcon from "@mui/icons-material/Add";

export default function AddMovInvButton({ onMovInvSubmit }) {
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
        variant="contained"
        startIcon={<AddIcon />}
        size="medium"
        sx={{ width: 270 }}
      >
        Agregar Mov. Inventario
      </Button>
      <AddMovInv
        open={modalOpen}
        onClose={handleCloseModal}
        onMovInvSubmit={onMovInvSubmit}
      />
    </Grid>
  );
}
