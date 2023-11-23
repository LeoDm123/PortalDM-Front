import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import EditCliente from "../../../pages/Clientes/Modals/EditCliente";

export default function EditClienteButton({
  selectedClientIndex,
  onClientChange,
  onClientDelete,
}) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid>
      <IconButton onClick={handleClick} size="small" sx={{ color: "#01662b" }}>
        <EditIcon />
      </IconButton>
      <EditCliente
        open={modalOpen}
        onClose={handleCloseModal}
        selectedClientIndex={selectedClientIndex}
        onClientChange={onClientChange}
        onClientDelete={onClientDelete}
      />
    </Grid>
  );
}
