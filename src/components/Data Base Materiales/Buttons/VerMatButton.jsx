import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MatDetails from "../Modals/MatDetails";

const VerMatButton = ({ matID }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMat, setselectedMat] = useState("");

  const handleClick = () => {
    setModalOpen(true);
    setselectedMat(matID);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClick} startIcon={<VisibilityIcon />}>
        Detalles
      </Button>
      <MatDetails
        open={modalOpen}
        onClose={handleCloseModal}
        matID={selectedMat}
      />
    </div>
  );
};

export default VerMatButton;
