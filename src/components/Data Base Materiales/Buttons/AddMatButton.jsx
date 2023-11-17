import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import AgregarMat from "../Modals/AgregarMat";
import AddIcon from "@mui/icons-material/Add";

export default function AddMatButton({ onMatSubmit }) {
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
        startIcon={<AddIcon />}
        size="medium"
        sx={{ width: 210 }}
      >
        Agregar Material
      </Button>
      <AgregarMat
        open={modalOpen}
        onClose={handleCloseModal}
        onMatSubmit={onMatSubmit}
      />
    </Grid>
  );
}
