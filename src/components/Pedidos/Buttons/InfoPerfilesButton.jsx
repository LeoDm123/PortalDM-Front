import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoPerfilesPedidos from "../../../pages/Pedidos/Modals/InfoPerfilesPedidos";

export default function InfoPerfilesButton({ pedidoId, codigoMat }) {
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
      <InfoPerfilesPedidos
        pedidoId={pedidoId}
        codigoMat={codigoMat}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Grid>
  );
}
