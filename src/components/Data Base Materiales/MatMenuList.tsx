import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import StairsIcon from "@mui/icons-material/Stairs";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ForestIcon from "@mui/icons-material/Forest";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import DeckIcon from "@mui/icons-material/Deck";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import InventoryIcon from "@mui/icons-material/Inventory";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import StorageIcon from "@mui/icons-material/Storage";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";

function MatMenuListItems() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="Bases de Datos de Materiales" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ForestIcon />
            </ListItemIcon>
            <ListItemText primary="Madera Macisa y Alistonados" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <CropSquareIcon />
            </ListItemIcon>
            <ListItemText primary="Placas de MDF y Cantos" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <DeckIcon />
            </ListItemIcon>
            <ListItemText primary="Deck y Revestimientos de WPC" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <FormatColorFillIcon />
            </ListItemIcon>
            <ListItemText primary="Insumos de Lustre" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <MoreHorizIcon />
            </ListItemIcon>
            <ListItemText primary="Insumos Varios" />
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Costos de Mano de Obra" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Informes" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <InventoryIcon />
        </ListItemIcon>
        <ListItemText primary="Inventario" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <RequestQuoteIcon />
        </ListItemIcon>
        <ListItemText primary="Presupuestos" />
      </ListItemButton>
    </List>
  );
}

export default MatMenuListItems;
