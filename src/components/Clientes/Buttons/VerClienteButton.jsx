import * as React from "react";
import { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DetailsClientes from "../../../pages/Clientes/Modals/DetailsClientes";

export default function VerClienteButton({
  selectedClientIndex,
  onSubmitPay,
  onSubmitPres,
  onDeleteClient,
  onPresEdit,
  onPresDelete,
  onClientChange,
  onPayDelete,
}) {
  const [modalOpen, setModalOpen] = useState(false);
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
    <Grid>
      <IconButton onClick={handleClick} size="small" sx={{ color: "#01662b" }}>
        <VisibilityIcon />
      </IconButton>
      <DetailsClientes
        open={modalOpen}
        onClose={handleCloseModal}
        selectedClientIndex={selectedClient}
        onPaySubmit={onSubmitPay}
        onPresSubmit={onSubmitPres}
        onDeleteClient={onDeleteClient}
        onPresEdit={onPresEdit}
        onPresDelete={onPresDelete}
        onClientChange={onClientChange}
        onPayDelete={onPayDelete}
      />
    </Grid>
  );
}
