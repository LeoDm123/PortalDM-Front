import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoVariosPedidos from "../../../../pages/Pedidos/Modals/Varios/InfoVariosPedidos";

export default function InfoVariosButton({ pedidoId, codigoMat }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid>
      <IconButton onClick={handleClick} color="primary" size="small">
        <InfoOutlinedIcon />
      </IconButton>
      <InfoVariosPedidos
        pedidoId={pedidoId}
        codigoMat={codigoMat}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Grid>
  );
}
