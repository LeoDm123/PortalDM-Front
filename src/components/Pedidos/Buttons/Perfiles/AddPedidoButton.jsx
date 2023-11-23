import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import PedidoPerfiles from "../../../../pages/Pedidos/Modals/PedidoPerfiles";
import PedidoHerrajes from "../../../../pages/Pedidos/Modals/PedidoHerrajes";
import PedidoVidrios from "../../../../pages/Pedidos/Modals/PedidoVidrios";
import PedidoPlacasAlistonados from "../../../../pages/Pedidos/Modals/PedidoPlacasAlistonados";
import PedidoVarios from "../../../../pages/Pedidos/Modals/PedidoVarios";

const options = [
  "Pedido de Herrajes de Aberturas PVC",
  "Pedido de Perfiles de PVC",
  "Pedido de Placas y Alistonados",
  "Pedido de Vidrios",
  "Pedido de Insumos Varios",
];

export default function PresupuestosButton({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const anchorRef = useRef(null);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setModalOpen(true);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
    setModalOpen(false);
  };

  const renderModal = () => {
    switch (selectedIndex) {
      case 0:
        return <PedidoHerrajes open={modalOpen} onClose={handleClose} />;
      case 1:
        return (
          <PedidoPerfiles
            open={modalOpen}
            onClose={handleClose}
            onSubmit={onSubmit}
          />
        );
      case 2:
        return (
          <PedidoPlacasAlistonados open={modalOpen} onClose={handleClose} />
        );
      case 3:
        return <PedidoVidrios open={modalOpen} onClose={handleClose} />;
      case 4:
        return <PedidoVarios open={modalOpen} onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
        className="mb-3"
      >
        <Button className="ActionButton" onClick={handleToggle}>
          Crear pedido de material
        </Button>
        <Button
          className="ActionButtonIcon"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1000,
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
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      {renderModal()}
    </React.Fragment>
  );
}
