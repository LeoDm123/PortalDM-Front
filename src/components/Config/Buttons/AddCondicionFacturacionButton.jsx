import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AddCondicionFacturacionModal from "../Modal/AddCondicionFacturacionModal";

export default function AddCondicionFacturacionButton({ onCondicionCreation }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid>
      <IconButton onClick={handleClick} size="small">
        <NoteAddIcon />
      </IconButton>
      <AddCondicionFacturacionModal
        open={modalOpen}
        onClose={handleCloseModal}
        onCondicionCreation={onCondicionCreation}
      />
    </Grid>
  );
}
