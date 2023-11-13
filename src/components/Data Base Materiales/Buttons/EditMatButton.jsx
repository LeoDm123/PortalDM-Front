import React, { useState, useEffect } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import EditMaterial from "../../../pages/Data Base Materiales/MatsDB/Modals/EditMat";

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
      <ButtonGroup variant="outlined" aria-label="delete">
        <IconButton onClick={handleClick}>
          <EditIcon />
        </IconButton>
        <EditMaterial
          open={modalOpen}
          onClose={handleCloseModal}
          matID={selectedMat}
          onMatChange={onMatChange}
        />
      </ButtonGroup>
    </div>
  );
};

export default EditMatButton;
