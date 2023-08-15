import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import AgregarProdInfo from "../../pages/Data Base Materiales/ProdInfoDB/AgregarProdInfo";

export default function AddProdInfoButton() {
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
            Agregar Datos
          </Button>
        </ButtonGroup>
        <AgregarProdInfo open={modalOpen} onClose={handleCloseModal} />
      </React.Fragment>
    </Grid>
  );
}
