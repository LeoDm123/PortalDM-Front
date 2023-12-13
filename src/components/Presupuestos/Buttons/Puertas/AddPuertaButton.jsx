import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddPuertaModal from "../../Modal/Puertas/AddPuertaModal";

export default function AddPuertaButton() {
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
        onClick={handleClick}
        size="medium"
        variant="contained"
        startIcon={<PostAddIcon />}
      >
        Agregar Puerta
      </Button>
      <AddPuertaModal open={modalOpen} onClose={handleCloseModal} />
    </Grid>
  );
}
