import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Paper from "@mui/material/Paper";
import AddMovInvForm from "../Forms/AddMovInvForm";

const AgregarMovInv = ({ open, onClose, onMovInvSubmit }) => {
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
        <AddMovInvForm onClose={onClose} onMovInvSubmit={onMovInvSubmit} />
      </Paper>
    </Modal>
  );
};

export default AgregarMovInv;
