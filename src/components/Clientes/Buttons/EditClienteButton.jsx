import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from "@mui/icons-material/Edit";
import EditCliente from "../../../pages/Clientes/Modals/EditCliente";

export default function EditClienteButton({ selectedClientIndex }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid>
      <ButtonGroup
        variant="contained"
        aria-label="split button"
        sx={{
          height: "30px",
          width: "30px",
        }}
      >
        <Button onClick={handleClick}>
          <EditIcon />
        </Button>
        <EditCliente
          open={modalOpen}
          onClose={handleCloseModal}
          selectedClientIndex={selectedClientIndex}
        />
      </ButtonGroup>
    </Grid>
  );
}
