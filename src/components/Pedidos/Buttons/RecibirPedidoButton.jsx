import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import EditPedidoPerfiles from "../../../pages/Pedidos/Modals/EditPedidoPerfiles";

export default function RecibirPedidoButton({ pedidoId, codigoMat }) {
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
      >
        <InventoryOutlinedIcon />
      </Button>
      <EditPedidoPerfiles
        pedidoId={pedidoId}
        codigoMat={codigoMat}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Grid>
  );
}
