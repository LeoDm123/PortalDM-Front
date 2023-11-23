import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import InfoPerfilesPedidosForm from "../../../components/Pedidos/Forms/InfoPerfilesPedidosForm";

const InfoPerfilesPedidos = ({ onClose, open, pedidoId, codigoMat }) => {
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
        <InfoPerfilesPedidosForm
          pedidoId={pedidoId}
          codigoMat={codigoMat}
          onClose={onClose}
        />
      </Paper>
    </Modal>
  );
};

export default InfoPerfilesPedidos;
