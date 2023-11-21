import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import AddPedidoForm from "../../../components/Pedidos/Forms/PedidoPerfilesForm";

const PedidoPlacasAlistonados = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        sx={{
          height: "95%",
          p: 2,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
        className="CreateModal"
      ></Paper>
    </Modal>
  );
};

export default PedidoPlacasAlistonados;
