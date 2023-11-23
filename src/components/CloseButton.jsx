import React from "react";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import CloseIcon from "@mui/icons-material/Close";

const CloseButton = ({ handleClick }) => {
  return (
    <ButtonGroup
      sx={{ borderRadius: 50, backgroundColor: "#01662b" }}
      variant="contained"
    >
      <IconButton sx={{ color: "#fff" }} onClick={handleClick}>
        <CloseIcon />
      </IconButton>
    </ButtonGroup>
  );
};

export default CloseButton;
