import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import RecibirPedidoVarios from "../../../../pages/Pedidos/Modals/Varios/RecibirPedidoVarios";

export default function RecibirVariosButton({
  pedidoId,
  codigoMat,
  onMatSubmit,
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
      <IconButton onClick={handleClick} size="small" color="primary">
        <InventoryOutlinedIcon />
      </IconButton>
      <RecibirPedidoVarios
        pedidoId={pedidoId}
        codigoMat={codigoMat}
        onSubmit={onMatSubmit}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Grid>
  );
}
