import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
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
    <div>
      <ButtonGroup
        variant="contained"
        aria-label="split button"
        sx={{
          height: "30px",
          width: "100%",
        }}
        className="mt-2"
      >
        <Button onClick={handleClick}>
          <VisibilityIcon />
        </Button>
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
      </ButtonGroup>
    </div>
  );
}
