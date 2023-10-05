import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";

const ModifyIconButton = ({ onPress }) => {
  return (
    <div>
      <ButtonGroup variant="contained" aria-label="split button">
        <Button onClick={onPress}>
          <EditIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default ModifyIconButton;
