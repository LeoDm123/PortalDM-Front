import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import AddPresupuesto from "../../../pages/Clientes/Modals/AddPresupuesto";

export default function AddPresupuestoButton({
  selectedClientIndex,
  onSubmitPres,
}) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedClient, setSelectedClient] = useState("");

  const handleClick = () => {
    setModalOpen(true);
    setSelectedClient(selectedClientIndex);
    console.log("selectedClient:", selectedClient);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setSelectedClient(selectedClientIndex);
  }, [handleClick]);

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <ButtonGroup variant="contained" aria-label="split button">
          <Button className="AddPresupuestoButton" onClick={handleClick}>
            Asociar Presupuesto
          </Button>
        </ButtonGroup>
        <AddPresupuesto
          open={modalOpen}
          onClose={handleCloseModal}
          selectedClientIndex={selectedClient}
          onSubmitPres={onSubmitPres}
        />
      </React.Fragment>
    </Grid>
  );
}
