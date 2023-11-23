import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import RecibirPedidoPerfilesForm from "../../../components/Pedidos/Forms/RecibirPedidoPerfilesForm";

const RecibirPedidoPerfiles = ({ onClose, open, pedidoId, codigoMat }) => {
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
      >
        <RecibirPedidoPerfilesForm
          pedidoId={pedidoId}
          codigoMat={codigoMat}
          onClose={onClose}
        />
      </Paper>
    </Modal>
  );
};

export default RecibirPedidoPerfiles;
