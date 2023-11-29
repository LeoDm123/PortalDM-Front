import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoMaderaPedidos from "../../../../pages/Pedidos/Modals/Madera/InfoMaderaPedidos";

export default function InfoMaderaButton({ pedidoId, codigoMat }) {
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
      <InfoMaderaPedidos
        pedidoId={pedidoId}
        codigoMat={codigoMat}
        open={modalOpen}
        onClose={handleCloseModal}
      />
    </Grid>
  );
}
