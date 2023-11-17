import React, { useState, useEffect } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditMaterial from "../Modals/EditMat";
import Button from "@mui/material/Button";

const EditMatButton = ({ matID, onMatChange }) => {
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
      <Button onClick={handleClick} startIcon={<EditIcon />}>
        Editar
      </Button>
      <EditMaterial
        open={modalOpen}
        onClose={handleCloseModal}
        matID={selectedMat}
        onMatChange={onMatChange}
      />
    </div>
  );
};

export default EditMatButton;
