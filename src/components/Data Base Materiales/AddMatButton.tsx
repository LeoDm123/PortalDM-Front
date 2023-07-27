import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AgregarMat from "../../pages/Data Base Materiales/AgregarMat";

export default function AddMatButton() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddClient = () => {
    // Your logic for adding a new client goes here
    // For example, you can navigate to the Add Client page
    navigate("/AgregarMat");
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <ButtonGroup
          className="mb-3"
          variant="contained"
          aria-label="split button"
        >
          <Button className="AddMatButton" onClick={handleClick}>
            Agregar Material
          </Button>
        </ButtonGroup>
        <AgregarMat open={modalOpen} onClose={handleCloseModal} />
      </React.Fragment>
    </Grid>
  );
}
