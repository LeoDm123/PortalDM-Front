import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DetailsClientes from "../../../pages/Clientes/Modals/DetailsClientes";

export default function VerClienteButton({ selectedClientIndex, onSubmitPay }) {
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
    <div>
      <ButtonGroup
        variant="contained"
        aria-label="split button"
        sx={{
          height: "30px",
          width: "30px",
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
          onSubmitPay={onSubmitPay}
        />
      </ButtonGroup>
    </div>
  );
}
