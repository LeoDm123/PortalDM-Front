import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";

export default function ModifyIconButton() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddClient = () => {
    navigate("/ModificarMat");
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <div>
        <ButtonGroup variant="contained" aria-label="split button">
          <Button onClick={handleClick}>
            <EditIcon />
          </Button>
        </ButtonGroup>
      </div>
    </Grid>
  );
}
