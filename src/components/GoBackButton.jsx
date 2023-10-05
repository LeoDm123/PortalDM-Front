import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const GoBackButton = ({ handleClick }) => {
  return (
    <ButtonGroup className="me-4" variant="outlined" aria-label="split button">
      <Button sx={{ backgroundColor: "#fff" }} onClick={handleClick}>
        <ArrowBackIcon sx={{ color: "#6a6a6a" }} />
      </Button>
    </ButtonGroup>
  );
};

export default GoBackButton;
