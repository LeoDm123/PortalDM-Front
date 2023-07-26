import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";

const options = [
  "Mostrar Placas de MDF y Cantos",
  "Mostrar Madera Maciza y Alistonados",
  "Mostrar Deck y Revestimientos de WPC",
  "Mostrar Insumos de Lustre",
  "Mostrar Insumos Varios",
];

export default function MatFilterButton() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedPage, setSelectedPage] = React.useState("");
  const [filteredMats, setFilteredMats] = React.useState("");

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const FilteredCategory = (index: number) => {
    if (index === 0) {
      setFilteredMats("Mostrar Placas de MDF y Cantos");
    } else if (index === 1) {
      setFilteredMats("Mostrar Madera Maciza y Alistonados");
    } else if (index === 2) {
      setFilteredMats("Mostrar Deck y Revestimientos de WPC");
    } else if (index === 3) {
      setFilteredMats("Mostrar Insumos de Lustre");
    } else {
      setFilteredMats("Mostrar Insumos Varios");
    }
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    index: number
  ) => {
    FilteredCategory(index);
    setOpen(false);
    console.log(filteredMats);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleToggle}>
          <FilterListIcon />
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
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === null}
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
