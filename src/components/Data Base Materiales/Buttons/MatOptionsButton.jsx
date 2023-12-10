import React, { useRef } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import EditMatButton from "./EditMatButton";
import VerMatButton from "./VerMatButton";
import DeleteMatButton from "./DeleteMatButton";
import DeleteMat from "../../../hooks/Materiales/deleteMatByID";
import fetchMats from "../../../hooks/Materiales/fetchMats";

const MatsOptionsButton = ({ matID, onMatChange }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = useRef(null);
  const { deleteMat } = DeleteMat();

  const handleDeleteMat = async (matId) => {
    try {
      const willDelete = await swal({
        title: "¿Desea eliminar el material?",
        text: "Una vez eliminado no podrá ser recuperado",
        icon: "warning",
        buttons: ["No", "Sí"],
        dangerMode: true,
      });

      if (willDelete) {
        await deleteMat(matId);
        fetchMats();
      }
    } catch (error) {
      console.error("Error deleting material:", error);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <>
      <ButtonGroup variant="text" ref={anchorRef} aria-label="split button">
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <MoreHorizIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  <MenuItem>
                    <DeleteMatButton onDelete={() => handleDeleteMat(matID)} />
                  </MenuItem>
                  <MenuItem>
                    <VerMatButton matID={matID} />
                  </MenuItem>
                  <MenuItem>
                    <EditMatButton matID={matID} onMatChange={onMatChange} />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

export default MatsOptionsButton;
