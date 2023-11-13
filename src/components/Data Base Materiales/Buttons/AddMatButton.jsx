import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AgregarMat from "../../../pages/Data Base Materiales/MatsDB/AgregarMat";

export default function AddMatButton({ onMatSubmit }) {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <ButtonGroup
          className="mb-3"
          variant="contained"
          aria-label="split button"
        >
          <Button className="AddButton" onClick={handleClick}>
            Agregar Material
          </Button>
        </ButtonGroup>
        <AgregarMat
          open={modalOpen}
          onClose={handleCloseModal}
          onMatSubmit={onMatSubmit}
        />
      </React.Fragment>
    </Grid>
  );
}
