import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoTerminacionModal from "../../../Modal/Puertas/Terminaciones/InfoTerminacionModal";

export default function InfoTerminacionButton({ terminacionIndex }) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [TerminacionIndex, setTerminacionIndex] = React.useState(null);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid>
      <IconButton onClick={handleClick} size="small">
        <InfoOutlinedIcon />
      </IconButton>
      <InfoTerminacionModal
        open={modalOpen}
        onClose={handleCloseModal}
        terminacionIndex={terminacionIndex}
      />
    </Grid>
  );
}
