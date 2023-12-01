import React, { useState, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import FilterListIcon from "@mui/icons-material/FilterList";

const options = [
  "Perfilería de PVC",
  "Madera Maciza y Alistonados",
  "Placas de MDF y Cantos",
  "Deck y Revestimientos de WPC",
  "Insumos de Lustre",
  "Insumos Varios",
  "Herrajes para Aberturas de PVC",
  "Herrajes para Puertas de Madera",
  "Mostrar Todos",
];

export default function MatFilterButton({ onFilterChange }) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const FilteredCategory = (index) => {
    setSelectedIndex(index);
    if (index === 8) {
      onFilterChange("");
    } else {
      onFilterChange(options[index]);
    }
    setOpen(false);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log("Index", index);
    FilteredCategory(index);
    setOpen(false);
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
    <React.Fragment>
      <IconButton
        size="small"
        ref={anchorRef}
        onClick={handleToggle}
        color="primary"
        sx={{ paddingBottom: 1 }}
      >
        <FilterListIcon />
      </IconButton>
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
                      disabled={index === -1}
                      selected={index === selectedIndex}
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
    </React.Fragment>
  );
}
