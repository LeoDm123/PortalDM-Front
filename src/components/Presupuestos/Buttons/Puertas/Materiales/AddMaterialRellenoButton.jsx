import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AddMaterialRellenoModal from "../../../Modal/Puertas/Materiales/AddMaterialRellenoModal";

export default function AddMaterialRellenoButton() {
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
      <AddMaterialRellenoModal open={modalOpen} onClose={handleCloseModal} />
    </Grid>
  );
}
