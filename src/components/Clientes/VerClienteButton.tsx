import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DetailsClientes from "../../pages/Clientes/DetailsClientes";

export default function VerClienteButton({ selectedClientIndex }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
          selectedClientIndex={selectedClientIndex}
        />
      </ButtonGroup>
    </div>
  );
}
