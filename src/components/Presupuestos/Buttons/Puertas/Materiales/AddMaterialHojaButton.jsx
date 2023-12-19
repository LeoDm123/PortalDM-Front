import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AddMaterialHojaModal from "../../../Modal/Puertas/Materiales/AddMaterialHojaModal";

export default function AddMaterialHojaButton() {
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
      <AddMaterialHojaModal open={modalOpen} onClose={handleCloseModal} />
    </Grid>
  );
}
