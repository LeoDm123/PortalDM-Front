import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import InfoVariosPedidosForm from "../../../../components/Pedidos/Forms/Varios/InfoPedidoVariosForm";

const InfoVariosPedidos = ({ onClose, open, pedidoId, codigoMat }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="CreateModal"
      >
        <InfoVariosPedidosForm
          pedidoId={pedidoId}
          codigoMat={codigoMat}
          onClose={onClose}
        />
      </Paper>
    </Modal>
  );
};

export default InfoVariosPedidos;
