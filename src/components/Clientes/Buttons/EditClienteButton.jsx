import * as React from "react";
import Button from "@mui/material/Button";
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
      <Button
        onClick={handleClick}
        variant="text"
        aria-label="split button"
        size="small"
        className="ps-5"
      >
        <EditIcon />
      </Button>
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
