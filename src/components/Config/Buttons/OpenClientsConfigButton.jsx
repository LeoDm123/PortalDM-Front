import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import SettingsIcon from "@mui/icons-material/Settings";
import ClientsConfigModal from "../Modal/Clients/ClientsConfigModal";

export default function OpenClientsConfigButton() {
  const [modalOpen, setModalOpen] = React.useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Grid>
      <IconButton onClick={handleClick} size="small">
        <SettingsIcon sx={{ width: 30, height: 30 }} />
      </IconButton>
      <ClientsConfigModal open={modalOpen} onClose={handleCloseModal} />
    </Grid>
  );
}
