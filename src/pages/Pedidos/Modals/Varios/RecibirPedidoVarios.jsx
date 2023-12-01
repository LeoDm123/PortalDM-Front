import React from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import RecibirPedidoVariosForm from "../../../../components/Pedidos/Forms/Varios/RecibirPedidoVariosForm";

const RecibirPedidoVarios = ({
  onClose,
  open,
  pedidoId,
  codigoMat,
  onSubmit,
}) => {
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
        <RecibirPedidoVariosForm
          pedidoId={pedidoId}
          codigoMat={codigoMat}
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </Paper>
    </Modal>
  );
};

export default RecibirPedidoVarios;
