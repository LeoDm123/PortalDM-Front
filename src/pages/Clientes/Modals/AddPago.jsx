import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import AddPagoForm from "../../../components/Clientes/Forms/AddPagoForm";

const AddPago = ({
  open,
  onClose,
  onPay,
  selectedClientIndex,
  onSubmitPay,
}) => {
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
      >
        <AddPagoForm
          onClose={onClose}
          open={open}
          selectedClientIndex={selectedClientIndex}
          onSubmitPay={onSubmitPay}
        />
      </Paper>
    </Modal>
  );
};

export default AddPago;
