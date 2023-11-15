import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
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
      <ButtonGroup variant="outlined" aria-label="delete">
        <IconButton onClick={handleClick}>
          <VisibilityIcon />
        </IconButton>
        <MatDetails
          open={modalOpen}
          onClose={handleCloseModal}
          matID={selectedMat}
        />
      </ButtonGroup>
    </div>
  );
};

export default VerMatButton;
