import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import ModificarMat from "../../pages/Data Base Materiales/ModificarMat";

export default function ModifyMatButton() {
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
    navigate("/ModificarMat");
  };

  return (
    <Grid item xs={12} md={12} lg={12}>
      <React.Fragment>
        <ButtonGroup
          className="mb-3 ms-3"
          variant="contained"
          aria-label="split button"
        >
          <Button className="AddMatButton" onClick={handleClick}>
            Modificar Material
          </Button>
        </ButtonGroup>
        <ModificarMat open={modalOpen} onClose={handleCloseModal} />
      </React.Fragment>
    </Grid>
  );
}
